import React, { useState } from 'react';
import './App.css';

function App() {
  // States for all input fields
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [amh, setAmh] = useState('');
  const [weightGain, setWeightGain] = useState('');
  const [hairGrowth, setHairGrowth] = useState('');
  const [skinDarkening, setSkinDarkening] = useState('');
  const [hairLoss, setHairLoss] = useState('');
  const [pimples, setPimples] = useState('');
  const [fastFood, setFastFood] = useState('');
  const [follicleLeft, setFollicleLeft] = useState('');
  const [follicleRight, setFollicleRight] = useState('');
  const [avgFSizeLeft, setAvgFSizeLeft] = useState('');
  const [avgFSizeRight, setAvgFSizeRight] = useState('');

  // State to hold prediction result
  const [prediction, setPrediction] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      age, weight, bmi, cycleLength, amh, weightGain, hairGrowth, skinDarkening,
      hairLoss, pimples, fastFood, follicleLeft, follicleRight, avgFSizeLeft, avgFSizeRight
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setPrediction(result.prediction);  // Display prediction result
    } catch (error) {
      console.error("Error:", error);
      setPrediction('Error in prediction. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1 className="heading">PCOD Prediction Model</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <label>Age (yrs)</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          <small>Age, which affects PCOS risk.</small>
        </div>
        <div className="input-container">
          <label>Weight (Kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          <small>Your body weight.</small>
        </div>
        <div className="input-container">
          <label>BMI</label>
          <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} required />
          <small>A measure of body fat.</small>
        </div>
        <div className="input-container">
          <label>Cycle Length (days)</label>
          <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} required />
          <small>Days between menstrual cycles.</small>
        </div>
        <div className="input-container">
          <label>AMH (ng/mL)</label>
          <input type="number" value={amh} onChange={(e) => setAmh(e.target.value)} required />
          <small>Hormone level linked to PCOS.</small>
        </div>
        <div className="input-container">
          <label>Weight Gain (Y/N)</label>
          <select value={weightGain} onChange={(e) => setWeightGain(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Recent unexplained weight gain.</small>
        </div>
        <div className="input-container">
          <label>Hair Growth (Y/N)</label>
          <select value={hairGrowth} onChange={(e) => setHairGrowth(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Excess body or facial hair.</small>
        </div>
        <div className="input-container">
          <label>Skin Darkening (Y/N)</label>
          <select value={skinDarkening} onChange={(e) => setSkinDarkening(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Darkened skin in specific areas.</small>
        </div>
        <div className="input-container">
          <label>Hair Loss (Y/N)</label>
          <select value={hairLoss} onChange={(e) => setHairLoss(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Thinning hair on scalp.</small>
        </div>
        <div className="input-container">
          <label>Pimples (Y/N)</label>
          <select value={pimples} onChange={(e) => setPimples(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Presence of acne.</small>
        </div>
        <div className="input-container">
          <label>Fast Food (Y/N)</label>
          <select value={fastFood} onChange={(e) => setFastFood(e.target.value)} required>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <small>Eating fast food regularly.</small>
        </div>
        <div className="input-container">
          <label>Follicle No. (Left)</label>
          <input type="number" value={follicleLeft} onChange={(e) => setFollicleLeft(e.target.value)} required />
          <small>Follicles in the left ovary.</small>
        </div>
        <div className="input-container">
          <label>Follicle No. (Right)</label>
          <input type="number" value={follicleRight} onChange={(e) => setFollicleRight(e.target.value)} required />
          <small>Follicles in the right ovary.</small>
        </div>
        <div className="input-container">
          <label>Avg. F Size (Left) (mm)</label>
          <input type="number" value={avgFSizeLeft} onChange={(e) => setAvgFSizeLeft(e.target.value)} required />
          <small>Average follicle size in left ovary.</small>
        </div>
        <div className="input-container">
          <label>Avg. F Size (Right) (mm)</label>
          <input type="number" value={avgFSizeRight} onChange={(e) => setAvgFSizeRight(e.target.value)} required />
          <small>Average follicle size in right ovary.</small>
        </div>
        <button type="submit" className="submit-btn">Predict</button>
      </form>

      {/* Display the prediction result below the button */}
      {prediction && (
        <div className="result">
          <h2>{prediction}</h2>
        </div>
      )}

      {/* Message about consulting a doctor */}
      <div className="doctor-message">
        <p><strong>PLEASE, consult a doctor if shown positive.</strong></p>
      </div>
    </div>
  );
}

export default App;