import React from 'react';
import './ScoreBoard.css';
import restartIcon from './img/restart.png';

function ScoreBoard(props) {
  return (
    <div className='scoreboard'>
      <ul>
        <li>Highest Completed Level: {props.best}</li>
        <li>Current Level: {props.level}</li>
        <li>Current Streak: {props.streak}</li>
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
