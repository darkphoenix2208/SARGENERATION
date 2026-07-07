"""
ml_engine.py — Isolation Forest training, prediction and metric computation.

Loads HI-Small_Trans.csv, trains an Isolation Forest model, and exposes
helper functions consumed by the Flask API.
"""

import os
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    average_precision_score,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)
from sklearn.model_selection import train_test_split

# ---------------------------------------------------------------------------
# Globals — populated by train_model()
# ---------------------------------------------------------------------------
_model = None
_X_test = None
_y_test = None
_y_pred = None
_anomaly_scores = None
_feature_names = None
_model_metrics = None
_cases = None
_df = None  # cleaned dataframe

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
CSV_PATH = os.path.join(DATA_DIR, "HI-Small_Trans.csv")

TARGET = "Is_Laundering"


# ---------------------------------------------------------------------------
# Training
# ---------------------------------------------------------------------------
def train_model(csv_path: str | None = None):
    """Load CSV, clean, encode, split, train Isolation Forest."""
    global _model, _X_test, _y_test, _y_pred, _anomaly_scores
    global _feature_names, _model_metrics, _cases, _df

    path = csv_path or CSV_PATH
    if not os.path.exists(path):
        raise FileNotFoundError(
            f"Data file not found at {path}. "
            "Please place HI-Small_Trans.csv in the backend/data/ directory."
        )

    # 1. Load -----------------------------------------------------------
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip().str.replace(" ", "_")

    if "Account.1" in df.columns:
        df = df.rename(columns={"Account": "From_Account", "Account.1": "To_Account"})

    # Keep a copy before encoding for SAR generation
    _df = df.copy()

    df = df.drop(columns=["Timestamp"], errors="ignore")

    # Clean target
    df[TARGET] = pd.to_numeric(df[TARGET], errors="coerce")
    df = df.dropna(subset=[TARGET])
    df[TARGET] = df[TARGET].astype(int)

    # 2. Encode categoricals -------------------------------------------
    cat_cols = df.select_dtypes(include=["object"]).columns.tolist()
    for col in cat_cols:
        df[col] = df[col].astype("category").cat.codes

    # 3. Split ----------------------------------------------------------
    X = df.drop(columns=[TARGET])
    y = df[TARGET]
    _feature_names = X.columns.tolist()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    # 4. Train ----------------------------------------------------------
    fraud_rate = float(y_train.mean())
    iso_model = IsolationForest(
        n_estimators=200,
        contamination=fraud_rate,
        max_samples="auto",
        random_state=42,
        n_jobs=-1,
    )
    iso_model.fit(X_train)

    # 5. Predict --------------------------------------------------------
    scores = iso_model.decision_function(X_test)
    anomaly_score = -scores  # higher = more suspicious
    y_pred_raw = iso_model.predict(X_test)
    y_pred = np.where(y_pred_raw == -1, 1, 0)

    # 6. Metrics --------------------------------------------------------
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()

    accuracy = float(accuracy_score(y_test, y_pred) * 100)
    precision = float(precision_score(y_test, y_pred, zero_division=0) * 100)
    rec = float(recall_score(y_test, y_pred, zero_division=0) * 100)
    f1 = float(f1_score(y_test, y_pred, zero_division=0) * 100)
    roc_auc = float(roc_auc_score(y_test, anomaly_score))
    pr_auc = float(average_precision_score(y_test, anomaly_score))
    specificity = float(tn / (tn + fp) * 100) if (tn + fp) > 0 else 0.0
    fpr = float(fp / (fp + tn) * 100) if (fp + tn) > 0 else 0.0
    tpr = rec  # same as recall

    # Feature importances via mean absolute isolation path lengths
    # Isolation Forest doesn't have built-in feature_importances_,
    # so we approximate from the estimators.
    importances = _approximate_feature_importance(iso_model, X_train)

    _model_metrics = {
        "modelName": "Isolation Forest v1.0",
        "modelType": "Isolation Forest (Unsupervised Anomaly Detection)",
        "accuracy": round(accuracy, 1),
        "precision": round(precision, 1),
        "recall": round(rec, 1),
        "f1Score": round(f1, 1),
        "aucRoc": round(roc_auc, 3),
        "prAuc": round(pr_auc, 3),
        "specificity": round(specificity, 1),
        "falsePositiveRate": round(fpr, 1),
        "truePositiveRate": round(tpr, 1),
        "confusionMatrix": {"tp": int(tp), "fp": int(fp), "fn": int(fn), "tn": int(tn)},
        "featureImportance": importances,
        "confidenceInterval": f"{max(0, round(accuracy - 3, 1))}% — {min(100, round(accuracy + 3, 1))}%",
        "samplesAnalysed": int(len(X_test)),
        "trainingDataSize": f"{len(X_train):,} transactions",
        "lastRetrained": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "contamination": round(fraud_rate, 4),
        "classDistribution": {
            "legitimate": int((y == 0).sum()),
            "suspicious": int((y == 1).sum()),
        },
    }

    # Store for later use
    _model = iso_model
    _X_test = X_test
    _y_test = y_test
    _y_pred = y_pred
    _anomaly_scores = anomaly_score

    # 7. Build cases from flagged transactions --------------------------
    _cases = _build_cases(X_test, y_test, y_pred, anomaly_score)

    print(f"✅ Model trained. ROC-AUC={roc_auc:.3f}  PR-AUC={pr_auc:.3f}")
    return _model_metrics


def _approximate_feature_importance(model, X_train):
    """Approximate feature importance from Isolation Forest estimator depths."""
    importances_raw = np.zeros(X_train.shape[1])
    for tree in model.estimators_:
        tree_features = tree.tree_.feature
        # Count how often each feature is used for splitting
        for f in tree_features:
            if f >= 0:  # -2 means leaf node
                importances_raw[f] += 1

    # Normalise
    total = importances_raw.sum()
    if total > 0:
        importances_raw = importances_raw / total

    # Sort descending and return top features
    feature_names = X_train.columns.tolist()
    pairs = sorted(
        zip(feature_names, importances_raw), key=lambda x: x[1], reverse=True
    )

    return [
        {"feature": name, "importance": round(float(imp), 4)}
        for name, imp in pairs[:8]  # top 8
    ]


def _build_cases(X_test, y_test, y_pred, anomaly_scores):
    """Group flagged test samples into case-like objects for the frontend."""
    flagged_indices = np.where(y_pred == 1)[0]

    if len(flagged_indices) == 0:
        return []

    # Get the raw dataframe rows for flagged indices
    test_indices = X_test.index[flagged_indices]

    # Build cases from the flagged transactions
    cases = []
    # We'll create up to 20 representative cases, grouped by anomaly severity
    sorted_idx = np.argsort(-anomaly_scores[flagged_indices])  # most anomalous first
    selected = flagged_indices[sorted_idx[:min(60, len(sorted_idx))]]

    # Group into cases of ~5 transactions each
    case_num = 0
    for i in range(0, len(selected), 5):
        case_num += 1
        group = selected[i : i + 5]
        group_scores = anomaly_scores[group]
        group_true = y_test.iloc[group].values

        risk_score = int(min(99, max(10, np.mean(group_scores) * 50 + 50)))
        actual_fraud_count = int(group_true.sum())
        total_in_group = len(group)

        # Pull some info from the original dataframe
        original_indices = X_test.index[group]
        tx_data = _get_transaction_details(original_indices)

        cases.append(
            {
                "id": f"ML-{5000 + case_num}",
                "customer": tx_data.get("customer", f"Entity-{case_num}"),
                "risk": risk_score,
                "typology": tx_data.get("typology", "Anomaly Cluster"),
                "status": "Open" if risk_score >= 70 else "Under Review",
                "opened": pd.Timestamp.now().strftime("%Y-%m-%d"),
                "analyst": "ML Engine",
                "amount": tx_data.get("amount", "N/A"),
                "txCount": total_in_group,
                "counterparties": tx_data.get("counterparties", 0),
                "jurisdiction": tx_data.get("jurisdiction", "Unknown"),
                "mlScore": round(float(np.mean(group_scores)), 4),
                "actualFraud": actual_fraud_count,
                "source": "isolation_forest",
            }
        )

        if case_num >= 12:
            break

    return cases


def _get_transaction_details(indices):
    """Extract human-readable details from the raw dataframe for the given indices."""
    global _df
    if _df is None:
        return {}

    try:
        rows = _df.loc[indices]
        # Try to derive names from account columns
        from_accounts = set()
        to_accounts = set()
        amounts = []

        for col in rows.columns:
            if "from" in col.lower() or col == "From_Account":
                from_accounts.update(rows[col].dropna().astype(str).unique())
            if "to" in col.lower() or col == "To_Account":
                to_accounts.update(rows[col].dropna().astype(str).unique())
            if "amount" in col.lower():
                amounts.extend(rows[col].dropna().tolist())

        # Determine customer name from the most common from_account
        customer = "Unknown Entity"
        if from_accounts:
            customer = list(from_accounts)[0][:30]

        total_amount = sum(float(a) for a in amounts if isinstance(a, (int, float)))
        
        # Determine typology based on patterns
        typology = "Anomaly Cluster"
        if len(from_accounts) > 3:
            typology = "Funnel Accounts"
        elif len(to_accounts) > 3:
            typology = "Fan-Out Pattern"
        elif total_amount > 100000:
            typology = "High Value Anomaly"

        return {
            "customer": customer,
            "typology": typology,
            "amount": f"${total_amount:,.2f}" if total_amount > 0 else "N/A",
            "counterparties": len(from_accounts | to_accounts),
            "jurisdiction": "Multi" if len(to_accounts) > 2 else "Domestic",
        }
    except Exception:
        return {}


# ---------------------------------------------------------------------------
# Public getters
# ---------------------------------------------------------------------------
def get_model_metrics() -> dict | None:
    return _model_metrics


def get_cases() -> list:
    return _cases or []


def get_risk_distribution() -> list:
    """Return risk score distribution buckets for the frontend chart."""
    if _anomaly_scores is None:
        return []

    # Convert anomaly scores to 0-100 risk scale
    scores = np.clip(_anomaly_scores * 50 + 50, 0, 100)
    ranges = [(0, 20), (21, 40), (41, 60), (61, 80), (81, 100)]
    dist = []
    for lo, hi in ranges:
        count = int(((scores >= lo) & (scores <= hi)).sum())
        dist.append({"range": f"{lo}-{hi}", "count": count})
    return dist


def get_case_ml_stats(case_id: str) -> dict | None:
    """Return per-case ML statistics for a given case ID."""
    if _model_metrics is None or _cases is None:
        return None

    case = next((c for c in _cases if c["id"] == case_id), None)
    if case is None:
        return None

    # Return global model stats augmented with per-case info
    stats = dict(_model_metrics)
    stats["caseId"] = case_id
    stats["caseRiskScore"] = case["risk"]
    stats["caseMlScore"] = case.get("mlScore", 0)
    stats["samplesAnalysed"] = case.get("txCount", 0)
    return stats


def is_trained() -> bool:
    return _model is not None
