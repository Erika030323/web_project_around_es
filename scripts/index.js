import Card from './card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal, clearFormFields, resetFormValidation } from './utils.js';
import { initialCards, validationSettings } from './data.js';

//Modal y botones
const editPopup = document.querySelector(`#edit-popup`);
const editButton = document.querySelector(`.profile__edit-button`);
const closeButton = editPopup.querySelector(`.popup__close`);
//Campos del perfil en la pagina
const profileName = document.querySelector(`.profile__title`);
const profileJob = document.querySelector(`.profile__description`);
//Campos del formulario
const nameInput = editPopup.querySelector(`.popup__input_type_name`);
const jobInput = editPopup.querySelector(`.popup__input_type_description`);
const formElement = editPopup.querySelector(`.popup__form`);
// Modal y botones
const imageModal = document.querySelector(`#image-popup`);
const modalImage = imageModal.querySelector(`.popup__image`);
const modalCaption = imageModal.querySelector(`.popup__caption`);
const imageModalCloseButton = imageModal.querySelector(`.popup__close`);

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();

    //Restablecer validacion del formulario de editar perfil
    resetFormValidation(formElement, {
        inputSelector:'.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled'
    });

    openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(editPopup); 
}

editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", function() {
    closeModal(editPopup);
});

imageModalCloseButton.addEventListener(`click`, function() {
    closeModal(imageModal);
});

formElement.addEventListener(`submit`, handleProfileFormSubmit);

const cardTemplate = document.querySelector(`#card-template`);
const cardsContainer = document.querySelector(`.cards__list`);

initialCards.forEach((cardData) => {
    const card = new Card(cardData, '#card-template');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
});

const addButton = document.querySelector(`.profile__add-button`);
const addCardPopup = document.querySelector(`#new-card-popup`);
const addCardCloseButton = addCardPopup.querySelector(`.popup__close`);

addCardCloseButton.addEventListener(`click`, function() {
    closeModal(addCardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    //Valores de los campos del formulario para agregar mas imagenes
    const cardNameInput = addCardPopup.querySelector(`.popup__input_type_card-name`);
    const cardLinkInput = addCardPopup.querySelector(`.popup__input_type_url`);

    const newCard ={
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
   
    //crear y agregar la nueva tarjeta de img
    renderCard(newCard, cardsContainer);
    //cerrar la ventana emergente
    closeModal(addCardPopup);
    //limpiar el formulario
    evt.target.reset();    
}

const addCardForm = addCardPopup.querySelector(`.popup__form`);
addCardForm.addEventListener(`submit`, handleCardFormSubmit);

//Anadir el event listener a todos los popups
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOnOverlay);
});

addButton.addEventListener('click', function() {
    //Limpiar campos del formulario
    clearFormFields(addCardForm);

    //Restablecer validacion
    resetFormValidation(addCardForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled'
    });
    openModal(addCardPopup);
});
