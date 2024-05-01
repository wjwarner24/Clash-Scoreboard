
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

  const addOpp = async (new_id, new_tag, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/player/${new_id}/add-opp/${new_tag}`);
      const response = await axios.get(`http://localhost:3000/player/${new_id}/scores`);
      setScores(response.data.data);
    } catch (error) {
      console.error('Error adding opponent:', error);
    } finally {
      setLoading(false);
    }
  }

  const removeOpp = async (new_id, new_tag) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/player/${new_id}/remove-opp/${new_tag}`);
      const response = await axios.get(`http://localhost:3000/player/${new_id}/scores`);
      setScores(response.data.data);
    } catch (error) {
      console.error('Error removing opponent:', error);
    } finally {
      setLoading(false);
    }
  }

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
        {scores.length > 0 ? (
          <>
            <ul>
              {scores.map((score) => (
                <li key={score.id}>
                  {score.name}: Wins - {score.wins}, Losses - {score.losses}, Ties - {score.ties}
                  {score.remove_option && (
                    <button onClick={() => removeOpp(id, score.id)}>Remove</button>
                  )}
                </li>
              ))}
            </ul>
            <form onSubmit={(e) => {
              addOpp(id, e.target.elements.oppInput.value, e);
              e.target.reset();
            }}>
              <input type="text" name="oppInput" required />
              <button type="submit">Add Opponent</button>
            </form>
          </>
        ) : (
          <p>No scores to display</p>
        )}
      </section>
    </div>
  );
}

export default App;



