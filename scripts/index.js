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

// Selectores
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

// --- FUNCIONES DE TARJETAS ---

/**
 * Crea un elemento de tarjeta a partir de un objeto de datos.
 * Utiliza parámetros predeterminados para manejar datos incompletos.
 */
function getCardElement(data = { name: "Lugar desconocido", link: "https://via.placeholder.com/400" }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

/**
 * Renderiza una tarjeta en el contenedor especificado.
 */
function renderCard(data, container) {
  const cardElement = getCardElement(data);
  container.prepend(cardElement);
}

// --- FUNCIONES DE MODALES ---

function openModal(modal) {
  modal.classList.add('popup_opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modalProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalProfile);
}

// --- EVENT LISTENERS ---

editButton.addEventListener('click', handleOpenEditModal);
closeProfileButton.addEventListener('click', () => closeModal(modalProfile));
profileForm.addEventListener('submit', handleProfileFormSubmit);

// --- RENDERIZADO INICIAL ---

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});