import './App.css';
import React, { useState } from 'react';

function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [statusClass, setStatusClass] = useState('');
  const [unit, setUnit] = useState('imperial');
  const [darkMode, setDarkMode] = useState(false);
  const [tip, setTip] = useState('');

  const calcBmi = (e) => {
    e.preventDefault();

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid values");
      return;
    }

    let bmiValue;

    if (unit === 'imperial') {
      bmiValue = (weight / (height * height)) * 703;
    } else {
      bmiValue = weight / ((height / 100) ** 2);
    }

    bmiValue = bmiValue.toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage("Underweight");
      setStatusClass("under");
      setTip("Increase calorie intake, focus on protein-rich foods, and include strength training.");
    } 
    else if (bmiValue < 25) {
      setMessage("Normal weight");
      setStatusClass("normal");
      setTip("Maintain a balanced diet, stay active, and keep regular health checkups.");
    } 
    else {
      setMessage("Overweight");
      setStatusClass("over");
      setTip("Focus on portion control, regular exercise, and reducing sugary & fried foods.");
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
    setStatusClass('');
    setTip('');
  };

  const toggleUnit = () => {
    reset();
    setUnit(unit === 'imperial' ? 'metric' : 'imperial');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">

        <div className="top-bar">
          <h1>BMI Calculator</h1>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>

        <p className="subtitle">
          Using {unit === 'imperial' ? 'lbs / inches' : 'kg / cm'}
        </p>

        <button className="toggle-btn" onClick={toggleUnit}>
          Switch to {unit === 'imperial' ? 'Metric' : 'Imperial'}
        </button>

        <form onSubmit={calcBmi}>
          <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Height ({unit === 'imperial' ? 'in' : 'cm'})</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <div className="btn-group">
            <button className="btn" type="submit">Calculate</button>
            <button className="btn btn-outline" type="button" onClick={reset}>
              Reset
            </button>
          </div>

          {bmi && (
            <>
              <div className={`center ${statusClass}`}>
                <h3>Your BMI: {bmi}</h3>
                <p>{message}</p>
              </div>

              <div className="tip-card">
                <h4>Health Tip</h4>
                <p>{tip}</p>
              </div>
            </>
          )}
        </form>

      </div>
    </div>
  );
}

export default App;
