const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/es/lago.jpg"
  }
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

function openModal(modal) {
  modal.classList.add('popup_opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
}

function handleLikeIcon(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function getCardElement(data = { name: "Lugar desconocido", link: "https://via.placeholder.com/400" }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', handleLikeIcon);

  return cardElement;
}

function renderCard(data, container) {
  const cardElement = getCardElement(data);
  container.prepend(cardElement);
}

function handleOpenEditModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(modalProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  renderCard(newCardData, cardsContainer);
  closeModal(modalNewCard);
  newCardForm.reset();
}

editButton.addEventListener('click', handleOpenEditModal);
closeProfileButton.addEventListener('click', () => closeModal(modalProfile));
profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => openModal(modalNewCard));
closeNewCardButton.addEventListener('click', () => closeModal(modalNewCard));
newCardForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});