import { useCallback } from 'react';
import useGame from '../hooks/useGame';
import { saveScore } from '../api';

export default function Game({ onScoreSaved }) {
  const handleGameOver = useCallback(
    async (finalScore) => {
      if (finalScore > 0) {
        try {
          await saveScore(finalScore);
          onScoreSaved();
        } catch (err) {
          console.error('Failed to save score:', err);
        }
      }
    },
    [onScoreSaved]
  );

  const { snake, food, score, running, dead, startGame, COLS, ROWS, CELL } =
    useGame(handleGameOver);

  const width  = COLS * CELL;
  const height = ROWS * CELL;

  const isSnake = (x, y) => snake.some((s) => s.x === x && s.y === y);
  const isHead  = (x, y) => snake[0]?.x === x && snake[0]?.y === y;
  const isFood  = (x, y) => food.x === x && food.y === y;

  return (
    <div className="game-wrapper">
      <div className="score-display">Score: {score}</div>

      <div
        className="grid"
        style={{
          width:               `${width}px`,
          height:              `${height}px`,
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows:    `repeat(${ROWS}, ${CELL}px)`,
        }}
      >
        {Array.from({ length: ROWS }, (_, y) =>
          Array.from({ length: COLS }, (_, x) => {
            let cls = 'cell';
            if (isHead(x, y))        cls += ' head';
            else if (isSnake(x, y))  cls += ' snake';
            else if (isFood(x, y))   cls += ' food';
            return <div key={`${x}-${y}`} className={cls} />;
          })
        )}
      </div>

      <div className="game-controls">
        {!running && (
          <button onClick={startGame} className="btn-start">
            {dead ? 'Play Again' : 'Start Game'}
          </button>
        )}
        {dead && <p className="dead-msg">Game Over! Score: {score}</p>}
      </div>
    </div>
  );
}
