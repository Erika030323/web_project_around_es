import { openModal, closeModal, clearFormFields, resertFormValidation } from './utils.js';

function closePopupOnEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}

//Verificar que el clic sea especificamente en la superposicion
export function closePopupOnOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
}

//Funcion para limpiar los campos
export function clearFormFields(formElement) {
    const inputs = formElement.querySelectorAll('input');
    inputs.forEach((input) => {
        input.value = '';
    });
}

//Obtener todos los inputs del formulario
export function resetFormValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    //Limpiar c/d input
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });

    //Desactivar el boton
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
}

//funcion para mostrar error
function hideInputError (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(`popup__input_type_error`);
    errorElement.classList.remove(`popup__error_visible`);
    errorElement.textContent = "";
};