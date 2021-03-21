import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const initialCards = cards.map((card) => {
      return <Card cardData={card} onCardClick={props.onCardClick} key={card._id}/>
  })

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__userPhoto">
          <button type="button" className="button button_type_updateAvatar"></button>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__first-row">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="button button_type_edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{userDescription}</p>
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