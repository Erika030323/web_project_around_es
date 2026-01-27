import Card from './card.js';
import { openModal } from './utils.js';

export default class Card{
    constructor(data, templateSelector) {
        this._name = data.name;
        this.link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(thiss._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }
}

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