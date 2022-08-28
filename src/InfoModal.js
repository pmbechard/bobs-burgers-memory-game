import React from 'react';
import './InfoModal.css';

function InfoModal(props) {
  return (
    <div className='modal'>
      <h2>Created by Peyton Bechard, 2022,</h2>
      <h2>using Zachary Spielberger's awesome</h2>
      <h2>
        <a href='https://www.bobsburgersapi.com/' className='modal-link'>
          Bob's Burgers API
        </a>
      </h2>
      <h6>
        <a href='https://www.github.com/pmbechard' className='modal-link'>
          Check out the code and my other projects on GitHub.
        </a>
      </h6>
      <button onClick={props.info}>Close</button>
    </div>
  );
}

export default InfoModal;
