// src/components/Result.jsx

import React from 'react';
import './Result.css'; // Import the CSS file

const Result = ({ result }) => {
  const { prediction, probability } = result;
  const hasDisease = prediction === 1;

  return (
    <div className={`result-container ${hasDisease ? 'positive' : 'negative'}`}>
      <h3>Prediction Result</h3>
      <p>
        You have a{' '}
        <strong>{hasDisease ? 'high' : 'low'}</strong> chance of heart disease.
      </p>
      <p>Probability: {(probability * 100).toFixed(2)}%</p>
    </div>
  );
};

export default Result;
