import FormValidator from './FormValidator.js';

//funcion para mostrar error
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(`popup__input_type_error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`popup__error_visible`);
};

//funcion para mostrar error
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(`popup__input_type_error`);
    errorElement.classList.remove(`popup__error_visible`);
    errorElement.textContent = "";
};

//Funcion para validar campo individual
const checkInputValidity = (formElement,inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//Funcion para alternar estado del boton
const toggleButtonState = (inputList, buttonElement) => {
    const hasInvalidInput = inputList.some((inputElement) => {
        return!inputElement.validity.valid;
    });
    if(hasInvalidInput) {
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.disabled = false;
    }
};

//Funcion para habilitar validacion en un formulario
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener(`submit`, (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement,settings);
    });
};

//funcion para agregar event listeners a los inputs
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//Obtener todos los inputs del formulario
function resetFormValidation(formElement, settings) {
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