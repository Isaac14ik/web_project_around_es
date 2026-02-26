import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

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
const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#new-card-popup');
const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const profileForm = document.querySelector('#edit-profile-form');
const addCardForm = document.querySelector('#new-card-form');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const editFormValidator = new FormValidator(validationConfig, profileForm);
const addFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

initialCards.forEach(item => cardsContainer.append(createCard(item)));

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(editPopup);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardForm.reset();
  addFormValidator.resetValidation();
  openModal(addPopup);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {
    name: addCardForm.querySelector('.popup__input_type_card-name').value,
    link: addCardForm.querySelector('.popup__input_type_url').value
  };
  cardsContainer.prepend(createCard(cardData));
  closeModal(addPopup);
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});