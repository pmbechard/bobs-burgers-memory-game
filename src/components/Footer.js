import React from 'react';
import './Footer.css';
import githubIcon from './img/github.png';

function Footer() {
  return (
    <footer>
      <small>
        <a
          href='https://github.com/pmbechard/bobs-burgers-memory-game'
          target='_blank'
          rel='noreferrer'
        >
          <img src={githubIcon} alt='github' />
        </a>
        Peyton Bechard &copy; 2022
      </small>
    </footer>
  );
}

export default Footer;
