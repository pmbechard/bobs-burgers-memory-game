import React from 'react';
import CharacterCard from './CharacterCard';
import './GameBoard.css';

function GameBoard(props) {
  return (
    <div className='gameboard'>
      {props.cards.map((obj) => {
        return (
          <div key={obj.id}>
            <CharacterCard data={obj} click={props.click} />
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
