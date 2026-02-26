import Card from "./card.js";
import FormValidator from "./FormValidator.js";


const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lago.jpg" }
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};


const cardsContainer = document.querySelector('.cards__list');
const modalProfile = document.querySelector('#edit-popup');
const modalNewCard = document.querySelector('#new-card-popup');
const modalImage = document.querySelector('#image-popup');
const modalImageElement = modalImage.querySelector('.popup__image');
const modalImageCaption = modalImage.querySelector('.popup__caption');

const profileForm = document.querySelector('#edit-profile-form');
const newCardForm = document.querySelector('#new-card-form');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const cardTitleInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');


const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, newCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closeModal(openedPopup);
  }
}

function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handlePreviewImage(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  modalImageCaption.textContent = name;
  openModal(modalImage);
}


function createCard(data) {
  const card = new Card(data, "#card-template", handlePreviewImage);
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = { name: cardTitleInput.value, link: cardLinkInput.value };
  cardsContainer.prepend(createCard(newCardData));
  closeModal(modalNewCard);
  newCardForm.reset();
  addCardValidator.toggleButtonState();
}


document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editProfileValidator.resetValidation();
  openModal(modalProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  newCardForm.reset();
  addCardValidator.resetValidation();
  openModal(modalNewCard);
});


document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleCardFormSubmit);