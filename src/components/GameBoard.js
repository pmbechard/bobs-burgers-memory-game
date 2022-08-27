import React from 'react';
import CharacterCard from './CharacterCard';
import './GameBoard.css';
import uniqid from 'uniqid';

function GameBoard(props) {
  return (
    <div className='gameboard'>
      {props.cards.map((obj) => {
        return (
          <div key={uniqid()} className={props.display}>
            <CharacterCard data={obj} click={props.click} />
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
