import React from 'react';
import './CharacterCard.css';

function CharacterCard(props) {
  return (
    <div className='card'>
      <img src={props.data.img} alt={props.data.name} />
      <h4>{props.data.name}</h4>
    </div>
  );
}

export default CharacterCard;
