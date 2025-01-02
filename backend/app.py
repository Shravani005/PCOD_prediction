from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Assuming your model is saved as a .joblib file

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load your machine learning model (adjust the path to your model file)
model = joblib.load(r"C:\Users\DELL\Desktop\pcos\backend\pcos_rf_model (1) (1).joblib")

@app.route('/')
def home():
    return 'PCOD Prediction API is working!'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract features from the request
    features = [
        data['age'],
        data['weight'],
        data['bmi'],
        data['cycleLength'],
        data['amh'],
        data['weightGain'],
        data['hairGrowth'],
        data['skinDarkening'],
        data['hairLoss'],
        data['pimples'],
        data['fastFood'],
        data['follicleLeft'],
        data['follicleRight'],
        data['avgFSizeLeft'],
        data['avgFSizeRight'],
    ]

    # Reshape the data to match the input shape expected by the model
    prediction = model.predict([features])

    # Send back the prediction as a JSON response
    if prediction[0] == 1:
        return jsonify({'prediction': 'PCOD Detected'})
    else:
        return jsonify({'prediction': 'No PCOD Detected'})

if __name__ == '__main__':
    app.run(debug=True)