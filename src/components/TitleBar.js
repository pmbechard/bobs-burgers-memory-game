import React from 'react';
import './TitleBar.css';
import logo from './img/burger.png';

function TitleBar() {
  return (
    <nav>
      <ul className='navbar'>
        <li>
          <img src={logo} alt='logo' />
          <span>Bob's Burgers Memory Game</span>
        </li>

        <li>
          <button>About</button>
        </li>
      </ul>
    </nav>
  );
}

export default TitleBar;
