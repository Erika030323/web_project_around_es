const initialCards = [
    {name: "Valle de Yosemite",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"   
    },
    {name: "Lago Louise",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

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

function openModal(modal) {
    modal.classList.add(`popup_is-opened`);    
} 

function closeModal(modal) {
    modal.classList.remove(`popup_is-opened`);
} 

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
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

function getCardElement(cardData) {
    const cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector(`.card__title`).textContent = cardData.name;

    const cardImage = cardElement.querySelector(`.card__image`);
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    //Detector click agrandar img
    cardImage.addEventListener(`click`, function() {
        modalCaption.textContent = cardData.name;
        modalImage.src = cardData.link;
        modalImage.alt = cardData.name;

        openModal(imageModal);
    });

    //seleccionar el boton "me gusta"
    const likeButton = cardElement.querySelector(`.card__like-button`);
    likeButton.addEventListener(`click`, handleLikeButton);
    
    const deleteButton = cardElement.querySelector(`.card__delete-button`);
    deleteButton.addEventListener(`click`, function() {
        deleteButton.closest(`.card`).remove();
    });

    return cardElement;
}
//hacer que la funcion de me gusta a la img
function handleLikeButton(evt) {
    evt.target.classList.toggle(`card__like-button_is-active`);
}

function renderCard(cardData, container) {
    const cardElement = getCardElement(cardData);
    container.prepend(cardElement);
}

initialCards.forEach((card) => {
    renderCard(card, cardsContainer);
});

const addButton = document.querySelector(`.profile__add-button`);
const addCardPopup = document.querySelector(`#new-card-popup`);
const addCardCloseButton = addCardPopup.querySelector(`.popup__close`);

addButton.addEventListener(`click`, function() {
    openModal(addCardPopup);
});

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