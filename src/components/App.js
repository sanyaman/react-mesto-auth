import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function App() {
  
  const [isConfirmed, setIsConfirmed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState(
    {
      name: "Жак",
      about: "Доширак",
    });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cardList]) => {
        setCurrentUser({ name, about, avatar, _id })
        setCards(cardList)
      }
      )
      .catch((err) => console.log('Ошибка:', err))
  }, []);

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function handleCardLike(card, isLiked) {
    api.toggleLike(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('Ошибка:', err))
  }
  function confirmDelete() {
    setIsLoading(true)
    api.removeCard(isConfirmed)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== isConfirmed));
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => {
        setIsLoading(false)
        setIsDeletePopupOpen(false);
      })
  }

  function handleCardDelete(id) {
    setIsDeletePopupOpen(true)
    setIsConfirmed(id)
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api.setUserData(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true)
    api.setUserAvatar(link)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsAvatarPopupOpen(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.uploadCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddProfilePopupOpen(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <DeleteCardPopup
        isOpen={isDeletePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onDeleteCard={confirmDelete}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
