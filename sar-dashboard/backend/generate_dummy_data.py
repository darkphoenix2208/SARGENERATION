"""
generate_dummy_data.py — Creates a realistic synthetic HI-Small_Trans.csv

Generates ~5000 transactions with ~12% marked as laundering (Is_Laundering=1).
Laundering transactions have distinct patterns:
  - Higher amounts, more diverse counterparties, unusual time patterns
  - Specific account clusters that funnel/fan-out money
"""

import csv
import random
import os
from datetime import datetime, timedelta

random.seed(42)

# Config
NUM_TRANSACTIONS = 5000
FRAUD_RATE = 0.12  # ~12% laundering

# Account pools
LEGIT_ACCOUNTS = [f"8{random.randint(10000000, 99999999)}" for _ in range(200)]
SUSPICIOUS_ACCOUNTS = [f"9{random.randint(10000000, 99999999)}" for _ in range(30)]
ALL_ACCOUNTS = LEGIT_ACCOUNTS + SUSPICIOUS_ACCOUNTS

BANKS = ["Bank of Baroda", "HSBC", "Standard Chartered", "Deutsche Bank",
         "JPMorgan Chase", "Citibank", "Wells Fargo", "BNP Paribas",
         "Credit Suisse", "UBS", "Barclays", "Goldman Sachs",
         "Morgan Stanley", "ING Bank", "Societe Generale"]

CURRENCIES = ["US Dollar", "Euro", "British Pound", "Swiss Franc",
              "Japanese Yen", "Singapore Dollar", "Hong Kong Dollar",
              "UAE Dirham", "Indian Rupee", "Chinese Yuan"]

PAYMENT_FORMATS = ["Cheque", "ACH", "Wire", "Cash", "Bitcoin", "Reinvestment"]

# Countries risk-tiered
LOW_RISK = ["USA", "UK", "Germany", "France", "Japan", "Canada", "Australia"]
MEDIUM_RISK = ["Singapore", "Hong Kong", "India", "Brazil", "Mexico", "Turkey"]
HIGH_RISK = ["UAE", "Cayman Islands", "BVI", "Panama", "Bahamas", "Belize", "Mauritius"]

ALL_COUNTRIES = LOW_RISK + MEDIUM_RISK + HIGH_RISK

START_DATE = datetime(2022, 9, 1)
END_DATE = datetime(2022, 9, 30)


def random_timestamp():
    delta = (END_DATE - START_DATE).total_seconds()
    rand_seconds = random.random() * delta
    dt = START_DATE + timedelta(seconds=rand_seconds)
    return dt.strftime("%Y/%m/%d %H:%M")


def gen_legit_transaction():
    from_bank = random.choice(BANKS)
    to_bank = random.choice(BANKS)
    from_acct = random.choice(LEGIT_ACCOUNTS)
    to_acct = random.choice(LEGIT_ACCOUNTS)
    while to_acct == from_acct:
        to_acct = random.choice(LEGIT_ACCOUNTS)

    amount = round(random.lognormvariate(7, 1.5), 2)  # typical: $500-$5000
    amount = min(amount, 50000)  # cap at 50K for legit

    currency = random.choices(
        CURRENCIES, weights=[30, 20, 15, 5, 5, 5, 5, 5, 5, 5]
    )[0]
    payment = random.choices(
        PAYMENT_FORMATS, weights=[30, 30, 20, 10, 5, 5]
    )[0]

    from_country = random.choices(LOW_RISK + MEDIUM_RISK, weights=[5]*7 + [2]*6)[0]
    to_country = random.choices(LOW_RISK + MEDIUM_RISK, weights=[5]*7 + [2]*6)[0]

    return {
        "Timestamp": random_timestamp(),
        "From Bank": from_bank,
        "Account": from_acct,
        "To Bank": to_bank,
        "Account.1": to_acct,
        "Amount Received": amount,
        "Receiving Currency": currency,
        "Amount Paid": round(amount * random.uniform(0.98, 1.02), 2),
        "Payment Currency": currency,
        "Payment Format": payment,
        "Is Laundering": 0,
    }


def gen_laundering_transaction():
    """Laundering transactions have distinct patterns."""
    from_bank = random.choice(BANKS)
    to_bank = random.choice(BANKS)

    # Use suspicious accounts more often
    from_acct = random.choices(
        SUSPICIOUS_ACCOUNTS + LEGIT_ACCOUNTS[:20],
        weights=[3]*30 + [1]*20
    )[0]
    to_acct = random.choices(
        SUSPICIOUS_ACCOUNTS + LEGIT_ACCOUNTS[:20],
        weights=[3]*30 + [1]*20
    )[0]
    while to_acct == from_acct:
        to_acct = random.choice(SUSPICIOUS_ACCOUNTS)

    # Higher amounts, often near thresholds
    pattern = random.choice(["structuring", "large", "layering"])
    if pattern == "structuring":
        amount = round(random.uniform(8500, 9999), 2)  # near 10K threshold
    elif pattern == "large":
        amount = round(random.uniform(20000, 500000), 2)
    else:
        amount = round(random.uniform(5000, 50000), 2)

    # More diverse currencies and high-risk jurisdictions
    currency = random.choice(CURRENCIES)
    payment = random.choices(
        PAYMENT_FORMATS, weights=[10, 10, 35, 20, 15, 10]
    )[0]

    from_country = random.choices(
        ALL_COUNTRIES,
        weights=[2]*7 + [3]*6 + [5]*7
    )[0]
    to_country = random.choices(
        ALL_COUNTRIES,
        weights=[2]*7 + [3]*6 + [5]*7
    )[0]

    # Amount paid differs more (currency conversion / fees)
    amount_paid = round(amount * random.uniform(0.93, 1.07), 2)

    return {
        "Timestamp": random_timestamp(),
        "From Bank": from_bank,
        "Account": from_acct,
        "To Bank": to_bank,
        "Account.1": to_acct,
        "Amount Received": amount,
        "Receiving Currency": currency,
        "Amount Paid": amount_paid,
        "Payment Currency": random.choice(CURRENCIES),
        "Payment Format": payment,
        "Is Laundering": 1,
    }


def main():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)
    output_path = os.path.join(data_dir, "HI-Small_Trans.csv")

    rows = []
    num_fraud = int(NUM_TRANSACTIONS * FRAUD_RATE)
    num_legit = NUM_TRANSACTIONS - num_fraud

    for _ in range(num_legit):
        rows.append(gen_legit_transaction())
    for _ in range(num_fraud):
        rows.append(gen_laundering_transaction())

    # Shuffle
    random.shuffle(rows)

    # Write CSV
    fieldnames = [
        "Timestamp", "From Bank", "Account", "To Bank", "Account.1",
        "Amount Received", "Receiving Currency", "Amount Paid",
        "Payment Currency", "Payment Format", "Is Laundering"
    ]

    with open(output_path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    # Stats
    fraud_count = sum(1 for r in rows if r["Is Laundering"] == 1)
    legit_count = len(rows) - fraud_count
    print(f"✅ Generated {len(rows)} transactions → {output_path}")
    print(f"   Legitimate: {legit_count}  |  Laundering: {fraud_count}  |  Rate: {fraud_count/len(rows)*100:.1f}%")


if __name__ == "__main__":
    main()
