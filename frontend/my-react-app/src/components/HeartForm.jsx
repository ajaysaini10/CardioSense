// src/components/HeartForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Result from './Result';
import './HeartForm.css'; // Import the CSS file

const HeartForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert formData values to numbers
    const data = {};
    for (let key in formData) {
      data[key] = parseFloat(formData[key]);
    }

    axios
      .post('http://127.0.0.1:5000/predict', data)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error('There was an error making the prediction!', error);
      });
  };

  return (
    <div className="signup-container">
      <div className="left-container">
        <h1>
          Cardio🫀Sense
        </h1>

      </div>
      <div className="right-container">
        <header>
          <h1>
            Welcome! Please provide your details to assess your heart disease risk.
          </h1>
        </header>
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Age and Sex */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your age"
                required
              />
            </div>
            <div className="form-group">
              <label>Sex</label>
              <div className="radio-container">
                <input
                  id="sex-male"
                  type="radio"
                  name="sex"
                  value="1"
                  checked={formData.sex === '1'}
                  onChange={handleChange}
                />
                <label htmlFor="sex-male">Male</label>
                <input
                  id="sex-female"
                  type="radio"
                  name="sex"
                  value="0"
                  checked={formData.sex === '0'}
                  onChange={handleChange}
                />
                <label htmlFor="sex-female">Female</label>
              </div>
            </div>
          </div>

          {/* Chest Pain Type and Resting Blood Pressure */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="cp">Chest Pain Type</label>
              <select name="cp" value={formData.cp} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</label>
              <input
                id="trestbps"
                type="number"
                name="trestbps"
                value={formData.trestbps}
                onChange={handleChange}
                placeholder="e.g., 120"
                required
              />
            </div>
          </div>

          {/* Serum Cholesterol and Fasting Blood Sugar */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="chol">Serum Cholesterol (mg/dl)</label>
              <input
                id="chol"
                type="number"
                name="chol"
                value={formData.chol}
                onChange={handleChange}
                placeholder="e.g., 200"
                required
              />
            </div>
            <div className="form-group">
              <label>Fasting Blood Sugar &gt; 120 mg/dl</label>
              <div className="radio-container">
                <input
                  id="fbs-yes"
                  type="radio"
                  name="fbs"
                  value="1"
                  checked={formData.fbs === '1'}
                  onChange={handleChange}
                />
                <label htmlFor="fbs-yes">Yes</label>
                <input
                  id="fbs-no"
                  type="radio"
                  name="fbs"
                  value="0"
                  checked={formData.fbs === '0'}
                  onChange={handleChange}
                />
                <label htmlFor="fbs-no">No</label>
              </div>
            </div>
          </div>

          {/* Resting ECG and Max Heart Rate */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="restecg">Resting ECG Results</label>
              <select
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="thalach">Maximum Heart Rate Achieved</label>
              <input
                id="thalach"
                type="number"
                name="thalach"
                value={formData.thalach}
                onChange={handleChange}
                placeholder="e.g., 150"
                required
              />
            </div>
          </div>

          {/* Exercise-Induced Angina and ST Depression */}
          <div className="set">
            <div className="form-group">
              <label>Exercise-Induced Angina</label>
              <div className="radio-container">
                <input
                  id="exang-yes"
                  type="radio"
                  name="exang"
                  value="1"
                  checked={formData.exang === '1'}
                  onChange={handleChange}
                />
                <label htmlFor="exang-yes">Yes</label>
                <input
                  id="exang-no"
                  type="radio"
                  name="exang"
                  value="0"
                  checked={formData.exang === '0'}
                  onChange={handleChange}
                />
                <label htmlFor="exang-no">No</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="oldpeak">ST Depression Induced by Exercise</label>
              <input
                id="oldpeak"
                type="number"
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleChange}
                placeholder="e.g., 2.3"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Slope and Number of Major Vessels */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="slope">Slope of Peak Exercise ST Segment</label>
              <select name="slope" value={formData.slope} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ca">Number of Major Vessels (0-3)</label>
              <input
                id="ca"
                type="number"
                name="ca"
                value={formData.ca}
                onChange={handleChange}
                placeholder="e.g., 0"
                min="0"
                max="3"
                required
              />
            </div>
          </div>

          {/* Thalassemia */}
          <div className="set">
            <div className="form-group">
              <label htmlFor="thal">Thalassemia</label>
              <select name="thal" value={formData.thal} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <footer>
            <div className="set">
              <button type="submit" className="button-56" role="button">
                Predict
              </button>
            </div>
          </footer>
        </form>
        {result && <Result result={result} />}
      </div>
    </div>
  );
};

export default HeartForm;
