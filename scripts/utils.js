//Funcion para abrir cualquier  modal
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
}

//Funcion para cerrar cualquier modal
export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}

//Funcion para cerrar modal con la tecla Escape
function closePopupOnEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
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

    //Limpiar cada input
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });

    //Desactivar el boton
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    if (errorElement) {
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';        
    }
}
