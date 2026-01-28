import Card from './card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal, clearFormFields } from './utils.js';
import { initialCards, validationSettings } from './data.js';

const editPopup = document.querySelector(`#edit-popup`);
const addCardPopup = document.querySelector(`#new-card-popup`);
const imageModal = document.querySelector(`#image-popup`);
const formElement = editPopup.querySelector(`.popup__form`);
const addCardForm = addCardPopup.querySelector(`.popup__form`);
const editButton = document.querySelector(`.profile__edit-button`);
const addButton = document.querySelector(`.profile__add-button`);
const closeButton = editPopup.querySelector(`.popup__close`);
const addCardCloseButton = addCardPopup.querySelector(`.popup__close`);
const imageModalCloseButton = imageModal.querySelector(`.popup__close`);
//Campos del perfil en la pagina
const profileName = document.querySelector(`.profile__title`);
const profileJob = document.querySelector(`.profile__description`);
//Campos del formulario
const nameInput = editPopup.querySelector(`.popup__input_type_name`);
const jobInput = editPopup.querySelector(`.popup__input_type_description`);
// Modal y botones
const modalImage = imageModal.querySelector(`.popup__image`);
const modalCaption = imageModal.querySelector(`.popup__caption`);
const cardTemplate = document.querySelector(`#card-template`);
const cardsContainer = document.querySelector(`.cards__list`);
// Instancias de FOrmValidator
const editFormValidator = new FormValidator(validationSettings, formElement);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
//Activar validacion
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();


function handleOpenEditModal() {
    fillProfileForm();
    editFormValidator.resetFormValidation();
    openModal(editPopup);
}

addButton.addEventListener('click', function() {
    clearFormFields(addCardForm);
    addCardFormValidator.resetFormValidation();
    openModal(addCardPopup);
});

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
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

        const card = new Card(newCard, '#card-template');
        const cardElement = card.generateCard();    
        cardsContainer.prepend(cardElement);       

        clearFormFields(addCardForm);
        closeModal(addCardPopup);
}

addCardForm.addEventListener(`submit`, handleCardFormSubmit);

function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOnOverlay);
});

initialCards.forEach((cardData) => {
    const card = new Card(cardData, '#card-template');
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
});