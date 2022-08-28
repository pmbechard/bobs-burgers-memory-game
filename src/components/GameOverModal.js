import React from 'react';
import './GameOverModal.css';
import burgerImg from './img/burger.png';
import uniqid from 'uniqid';

function GameOverModal(props) {
  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2>Game over...</h2>
        <h2>Here's your prize!</h2>
        <div className='coupon'>
          <p>One (1) coupon for 20% off a ... </p>
          <img src={burgerImg} alt='burger' id='coupon-img' />
          <h3>"{props.botd}"</h3>
          <p>
            <small>Coupon ID: {uniqid()}</small>
          </p>
        </div>
        <button onClick={props.restart}>Try again</button>
      </div>
    </div>
  );
}

export default GameOverModal;
