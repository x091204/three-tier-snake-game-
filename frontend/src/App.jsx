import { useState } from 'react';
import Game        from './components/Game';
import Scoreboard  from './components/Scoreboard';
import './App.css';

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      <h1>Snake Game</h1>
      <div className="layout">
        <aside className="sidebar">
          <Scoreboard refreshTrigger={refresh} />
        </aside>
        <main className="game-area">
          <Game onScoreSaved={() => setRefresh((r) => r + 1)} />
        </main>
      </div>
    </div>
  );
}
