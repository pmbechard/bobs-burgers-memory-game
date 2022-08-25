import React from 'react';
import CharacterCard from './CharacterCard';
import './GameBoard.css';

function GameBoard(props) {
  return (
    <div className='gameboard'>
      {props.cards.map((obj) => {
        return (
          <div key={obj.id}>
            <CharacterCard data={obj} />
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
