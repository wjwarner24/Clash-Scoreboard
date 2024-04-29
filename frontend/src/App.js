// import React, { useState } from 'react';
// import axios from 'axios';

//const axios = require("axios");

import axios, * as others from 'axios';
const React = require('react');
const { useEffect, useState } = React;

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleIdChange = event => {
    setId(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/player/${id}`);
      const response = await axios.get(`http://localhost:3000/player/${id}/scores`);
      //console.log(response.data.data);
      setName(response.data.name);
      setScores(response.data.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
      setScores([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Player Scores</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={handleIdChange}
          placeholder="Enter Player ID"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Scores'}
        </button>
      </form>
      <section>

      </section>
        <p>{name}</p>
      <section>
        {scores != [] ? (
          <ul>
            {scores.map((score) => (
              <li key={score.id}>
                {score.name}: Wins - {score.wins}, Losses - {score.losses}, Ties - {score.ties}
              </li>
            ))}
          </ul>
        ) : (
          <p>No scores to display</p>
        )}
      </section>
    </div>
  );
}

export default App;







// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
