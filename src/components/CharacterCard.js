import React from 'react';
import './CharacterCard.css';

function CharacterCard(props) {
  return (
    <div className='card' onClick={(e) => props.click(e)} id={props.data.id}>
      <img src={props.data.img} alt={props.data.name} />
      <h4>{props.data.name}</h4>
    </div>
  );
}

export default CharacterCard;
