const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lago.jpg" }
];

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const modalProfile = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const closeProfileButton = modalProfile.querySelector('.popup__close');
const profileForm = document.querySelector('#edit-profile-form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const modalNewCard = document.querySelector('#new-card-popup');
const addButton = document.querySelector('.profile__add-button');
const closeNewCardButton = modalNewCard.querySelector('.popup__close');
const newCardForm = document.querySelector('#new-card-form');
const cardTitleInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const modalImage = document.querySelector('#image-popup');
const modalImageElement = modalImage.querySelector('.popup__image');
const modalImageCaption = modalImage.querySelector('.popup__caption');
const closeImageButton = modalImage.querySelector('.popup__close');

const popups = Array.from(document.querySelectorAll('.popup'));

/* --- Funciones de Validación --- */

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  
  if (hasInvalidInput) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
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

function handleLikeIcon(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}

function handlePreviewImage(name, link) {
  modalImageCaption.textContent = name;
  modalImageElement.src = link;
  modalImageElement.alt = name;
  openModal(modalImage);
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);
  cardImage.addEventListener('click', () => handlePreviewImage(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

function handleOpenEditModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  const inputList = Array.from(profileForm.querySelectorAll(".popup__input"));
  const buttonElement = profileForm.querySelector(".popup__button");
  inputList.forEach(input => hideInputError(profileForm, input));
  toggleButtonState(inputList, buttonElement);
  
  openModal(modalProfile);
}

function handleOpenAddModal() {
  newCardForm.reset();
  const inputList = Array.from(newCardForm.querySelectorAll(".popup__input"));
  const buttonElement = newCardForm.querySelector(".popup__button");
  
  inputList.forEach(input => hideInputError(newCardForm, input));
  toggleButtonState(inputList, buttonElement);
  
  openModal(modalNewCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard(name, link, cardsContainer);
  closeModal(modalNewCard);
  newCardForm.reset();
}



editButton.addEventListener('click', handleOpenEditModal);
closeProfileButton.addEventListener('click', () => closeModal(modalProfile));
profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', handleOpenAddModal);
closeNewCardButton.addEventListener('click', () => closeModal(modalNewCard));
newCardForm.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => closeModal(modalImage));

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

setEventListeners(profileForm);
setEventListeners(newCardForm);