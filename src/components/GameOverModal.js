import React from 'react';

function GameOverModal(props) {
  return (
    <div className='modal'>
      <h2>Game Over</h2>
      <button onClick={props.restart}>Try again</button>
    </div>
  );
}

export default GameOverModal;
