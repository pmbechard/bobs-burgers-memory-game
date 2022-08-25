import React from 'react';
import './TitleBar.css';
import logo from './img/burger.png';
import infoIcon from './img/info.png';

function TitleBar() {
  return (
    <nav>
      <ul className='navbar'>
        <li>
          <img src={logo} alt='logo' id='titlebar-logo' />
          <span id='title'>Bob's Burgers Memory Game</span>
        </li>

        <li>
          <button>
            <img src={infoIcon} alt='info' />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default TitleBar;
