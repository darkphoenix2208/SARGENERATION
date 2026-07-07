"""
app.py — Flask API server for the SAR ML backend.

Endpoints:
  GET /api/model-stats   — global model metrics
  GET /api/cases          — ML-flagged anomalous cases
  GET /api/generate-sar/<case_id>  — ML-informed SAR narrative
  GET /api/risk-distribution       — risk score distribution
  GET /api/health                  — health check
"""

import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

import ml_engine
import sar_generator

app = Flask(__name__)
CORS(app)  # allow frontend dev server to call us


# ---------------------------------------------------------------------------
# Startup — train model when server starts
# ---------------------------------------------------------------------------
def init_model():
    """Train the model at startup."""
    csv_path = os.environ.get("CSV_PATH", ml_engine.CSV_PATH)
    try:
        metrics = ml_engine.train_model(csv_path)
        print(f"🚀 Model ready. Metrics: accuracy={metrics['accuracy']}%, "
              f"ROC-AUC={metrics['aucRoc']}")
    except FileNotFoundError as e:
        print(f"⚠️  {e}")
        print("   The server will start but all endpoints will return empty data.")
        print("   Place the CSV and restart, or set CSV_PATH env var.")


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "modelTrained": ml_engine.is_trained(),
    })


@app.route("/api/model-stats")
def model_stats():
    metrics = ml_engine.get_model_metrics()
    if metrics is None:
        return jsonify({"error": "Model not trained. Place HI-Small_Trans.csv in backend/data/"}), 503
    return jsonify(metrics)


@app.route("/api/cases")
def cases():
    return jsonify(ml_engine.get_cases())


@app.route("/api/generate-sar/<case_id>")
def generate_sar(case_id):
    if not ml_engine.is_trained():
        return jsonify({"error": "Model not trained"}), 503
    result = sar_generator.generate_sar(case_id)
    if "error" in result:
        return jsonify(result), 404
    return jsonify(result)


@app.route("/api/risk-distribution")
def risk_distribution():
    dist = ml_engine.get_risk_distribution()
    if not dist:
        return jsonify({"error": "Model not trained"}), 503
    return jsonify(dist)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    init_model()
    port = int(os.environ.get("PORT", 5001))
    print(f"🌐 Flask ML API running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
