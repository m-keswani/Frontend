import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateSelection = () => {
  const [stateNames, setStateNames] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch state names from the "Indian States" API
    axios.get('https://api.covid19india.org/data.json')
      .then(response => {
        // Extract state names from the API response
        const states = response.data.statewise.map(state => state.state);
        setStateNames(states);
      })
      .catch(error => {
        console.error('Error fetching state names:', error);
      });
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div>
      <h1>Select a State</h1>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select a state</option>
        {stateNames.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      {selectedState && <p>You selected: {selectedState}</p>}
    </div>
  );
};

export default StateSelection;
