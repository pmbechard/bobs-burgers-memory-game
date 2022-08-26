import React from 'react';
import './ScoreBoard.css';
import restartIcon from './img/restart.png';

function ScoreBoard(props) {
  return (
    <div className='scoreboard'>
      <ul>
        <li>Highest Level: 0</li>
        <li>Current Level: 1</li>
        <li>
          <button onClick={props.restart}>
            <img src={restartIcon} alt='restart' />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ScoreBoard;
