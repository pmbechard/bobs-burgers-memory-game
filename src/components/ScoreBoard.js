import React from 'react';
import './ScoreBoard.css';

function ScoreBoard() {
  return (
    <div className='scoreboard'>
      <ul>
        <li>Current Level: 1</li>
        <li>Highest Level Completed: 0</li>
        <li>
          <button>Restart</button>
        </li>
      </ul>
    </div>
  );
}

export default ScoreBoard;
