export function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}