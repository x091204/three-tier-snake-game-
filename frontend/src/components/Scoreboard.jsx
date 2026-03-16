import { useEffect, useState } from 'react';
import { getTopScores } from '../api';

export default function Scoreboard({ refreshTrigger }) {
  const [scores,  setScores]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTopScores();
        setScores(res.data);
      } catch {
        setError('Could not load scores.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [refreshTrigger]); // re-fetches every time a score is saved

  return (
    <div className="scoreboard">
      <h2>Top 10 Scores</h2>

      {loading && <p>Loading...</p>}
      {error   && <p className="error">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s._id}>
                <td>#{i + 1}</td>
                <td>{s.score}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
