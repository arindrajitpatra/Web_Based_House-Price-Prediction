from flask import Flask, request, jsonify, render_template
import numpy as np
import joblib
import pandas as pd

# Load the trained model and scaler
model = joblib.load('linear_regression_model.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        data_df = pd.DataFrame([data])
        X = data_df.values
        X_scaled = scaler.transform(X)
        predictions = model.predict(X_scaled)
        return jsonify({'prediction': predictions[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
