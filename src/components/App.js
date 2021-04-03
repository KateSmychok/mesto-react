import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
          onCardClick={handleCardClick}/>
        <Footer/>

        //Редактировать профиль
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          submitButtonText="Сохранить"
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}>
          <input
            id="name"
            autoComplete="off"
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required/>
          <span className="popup__error" id="name-error"> </span>
          <input
            id="job"
            autoComplete="off"
            type="text"
            name="job"
            className="popup__input popup__input_type_job"
            placeholder="Вид деятельности"
            minLength="2"
            maxLength="200"
            required/>
          <span className="popup__error" id="job-error"> </span>
        </PopupWithForm>

        //Новое место
        <PopupWithForm
          title="Новое место"
          name="addCard"
          submitButtonText="Создать"
          isOpened={isAddPlacePopupOpened}
          onClose={closeAllPopups}>
          <input
            id="title"
            autoComplete="off"
            type="text"
            name="title"
            className="popup__input popup__input_type_card-title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required/>
          <span className="popup__error" id="title-error"> </span>
          <input
            id="link"
            autoComplete="off"
            type="url"
            name="link"
            className="popup__input popup__input_type_card-link"
            placeholder="Ссылка на картинку"
            required/>
          <span className="popup__error" id="link-error"> </span>
        </PopupWithForm>

        //Обновить аватар
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          submitButtonText="Сохранить"
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}>
          <input
            id="avatarLink"
            autoComplete="off"
            type="url"
            name="avatarLink"
            className="popup__input popup__input_type_avatar-link"
            placeholder="Ссылка на картинку"
            required/>
          <span className="popup__error" id="avatarLink-error"> </span>
        </PopupWithForm>

        //Вы уверены?
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          submitButtonText="Да"
          isOpened={false}
          onClose={closeAllPopups}>
        </PopupWithForm>

        <ImagePopup
          isOpened={isImagePopupOpened}
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
