import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setIsImagePopupOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}/>
        <Footer/>

        {/*Редактировать профиль*/}
        <EditProfilePopup isOpened={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/*Обновить аватар*/}
        <EditAvatarPopup isOpened={isEditAvatarPopupOpened} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {/*Добавить карточку*/}
        <AddPlacePopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup
          isOpened={isImagePopupOpened}
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>

        {/*Вы уверены?*/}
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          submitButtonText="Да"
          isOpened={false}
          onClose={closeAllPopups}>
        </PopupWithForm>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
