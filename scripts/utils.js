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
        input.value ='';
    });
}