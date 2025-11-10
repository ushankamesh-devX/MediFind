import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');



// ... (previous code)

useEffect(() => {
  axios.get('http://localhost:5000/symptoms')
    .then(res => setSymptoms(res.data))
    .catch(err => console.error(err));
}, []);

const addSymptom = () => {
  if (newSymptom) {
    axios.post('http://localhost:5000/symptoms', { text: newSymptom })
      .then(() => setNewSymptom(''))  // Refresh will happen via useEffect or manual fetch
      .catch(err => console.error(err));
  }
};

  return (
    <div className="App">
      <h1>My Health Tracker</h1>
      <input
        type="text"
        value={newSymptom}
        onChange={(e) => setNewSymptom(e.target.value)}
        placeholder="Log a symptom (e.g., Headache)"
      />
      <button onClick={addSymptom}>Add</button>
      <ul>
        {symptoms.map(symptom => (
          <li key={symptom.id}>{symptom.text} - {symptom.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;