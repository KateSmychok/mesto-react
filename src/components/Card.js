import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  return <li className="place">
    <img className="place__image" src={props.cardData.link} alt={props.cardData.name} onClick={handleClick}/>
    <div className="place__caption">
      <h2 className="place__title">{props.cardData.name}</h2>
      <div className="place__likes">
        <button type="button" className="button button_type_like"></button>
        <p className="place__likesCounter">{props.cardData.likes.length}</p>
      </div>
    </div>
    <button type="button" className="button button_type_delete"></button>
  </li>
}

export default Card;
