import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const user = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user._id);
    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
  }

  const initialCards = cards.map((card) => {
      return <Card cardData={card} key={card._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
  })

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__userPhoto">
          <button type="button" className="button button_type_updateAvatar"></button>
          <img className="profile__avatar" src={user.avatar} alt="Аватар" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__first-row">
            <h1 className="profile__name">{user.name}</h1>
            <button type="button" className="button button_type_edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{user.about}</p>
        </div>
        <button type="button" className="button button_type_add" onClick={props.onAddPlace}></button>
      </section>
      <section>
        <ul className="places">{initialCards}</ul>
      </section>
    </main>
  )
}

export default Main;