from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
# Configure CORS to allow requests from your React app's URL
CORS(app)

# Load the model and columns
model = joblib.load('model/heart_disease_model.pkl')
model_columns = joblib.load('model/model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        input_df = pd.DataFrame([data])
        input_encoded = pd.get_dummies(input_df)
        input_encoded = input_encoded.reindex(columns=model_columns, fill_value=0)
        prediction = model.predict(input_encoded)
        probability = model.predict_proba(input_encoded)[0][1]
        result = {
            'prediction': int(prediction[0]),
            'probability': float(probability)
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
