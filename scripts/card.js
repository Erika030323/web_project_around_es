import { openModal } from './utils.js';

export default class Card{
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _fillCardData() {
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
    }

    _handleLikeIcon() {
        this._likeButton.classList.toggle('card__like-button_is-active');
    }

    _handleDeleteIcon() {
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        const imageModal = document.querySelector('#image-popup');
        const modalImage = imageModal.querySelector('.popup__image');
        const modalCaption = imageModal.querySelector('.popup__caption');

        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalCaption.textContent = this._name;

        openModal(imageModal);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeIcon();
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteIcon();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._fillCardData();
        this._setEventListeners();

        return this._element;
    }
}

