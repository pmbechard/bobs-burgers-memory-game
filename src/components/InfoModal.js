import React from 'react';
import './InfoModal.css';

function InfoModal(props) {
  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <h2>Instructions:</h2>
        <p>
          In each level, you can only click on each character one time! Click
          all characters once to advance to the next level where 5 more
          characters will be added.
        </p>
        <p></p>
        <h4>
          Created by Peyton Bechard, 2022, using Zachary Spielberger's awesome
          <a
            href='https://www.bobsburgersapi.com/'
            className='modal-link'
            target='_blank'
            rel='noreferrer'
          >
            Bob's Burgers API.
          </a>
        </h4>
        <h4>
          <a
            href='https://www.github.com/pmbechard'
            className='modal-link'
            target='_blank'
            rel='noreferrer'
          >
            Check out the code and my other projects on GitHub.
          </a>
        </h4>
        <button onClick={props.info}>Close</button>
      </div>
    </div>
  );
}

export default InfoModal;
