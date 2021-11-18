import { uploadOffer } from './api.js';
import { transformLatLng } from './utils/transform-lat-lng.js';
import { INITIAL_COORDS } from './const.js';
import { resetFilters } from './filter.js';
import { resetMap, setDefaultAddress } from './map.js';
import { onErrorSendForm, onSuccessSendForm } from './modals.js';
import { uploadPhotos } from './upload-photo.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const PRICE_PLACEHOLDER = 1000;
const DEFAULT_OPTION_ROOM_SELECT = '1';

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const roomTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const housePriceTypes = {
  house: '5000',
  palace: '10000',
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
};

const imgDefault = 'img/muffin-grey.svg';

const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const offerRoomsSelect = document.querySelector('#room_number');
const offerGuestsSelect = document.querySelector('#capacity');
const offerHousingType = document.querySelector('#type');
const offerTimeIn = document.querySelector('#timein');
const offerTimeOut = document.querySelector('#timeout');
const offerAddressInput = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormReset = document.querySelector('.ad-form__reset');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo img');

const getInActive = () => {
  adForm.classList.add('ad-form--disabled');
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');
  const interactiveFields = document.querySelectorAll('form.ad-form > fieldset');
  interactiveFields.forEach((field) => {
    field.disabled = true;
  });
  const interactiveMapEl = document.querySelectorAll('form.map__filters > select');
  interactiveMapEl.forEach((select) => {
    select.disabled = true;
  });
};

const getActive = () => {
  adForm.classList.remove('ad-form--disabled');
  const interactiveFields = document.querySelectorAll('form.ad-form > fieldset');
  interactiveFields.forEach((field) => {
    field.disabled = false;
  });
};

const getActiveFilters = () => {
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  const interactiveMapEl = document.querySelectorAll('form.map__filters > select');
  interactiveMapEl.forEach((select) => {
    select.disabled = false;
  });
};

const validateTitle = () => {
  offerTitleInput.addEventListener('input', () => {
    const titleLength = offerTitleInput.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      offerTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      offerTitleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      offerTitleInput.setCustomValidity('');
    }

    offerTitleInput.reportValidity();
  });
};

const validatePrice = () => {
  offerPriceInput.addEventListener('input', () => {
    const priceValue = offerPriceInput.value;
    if (priceValue < Number(offerPriceInput.min)) {
      offerPriceInput.setCustomValidity('Слишком маленькая цена для выбранного типа жилья.');
    } else if (priceValue > MAX_PRICE_LENGTH) {
      offerPriceInput.setCustomValidity('Цена не может превышать 1 000 000 руб.');
    } else {
      offerPriceInput.setCustomValidity('');
    }

    offerPriceInput.reportValidity();
  });
};

const onRoomChange = (evt) => {
  Array.from(offerGuestsSelect.options).forEach((option) => {
    option.disabled = true;
  });

  roomValues[evt.target.value].forEach((seatsAmount) => {
    Array.from(offerGuestsSelect.options).forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const validateRoomsGuests = () => {
  offerRoomsSelect.addEventListener('change', onRoomChange);
};

const validateTypePrice = () => {
  offerHousingType.addEventListener('change', (evt) => {
    const value = evt.target.value;
    offerPriceInput.min = housePriceTypes[value];
    offerPriceInput.placeholder = housePriceTypes[value];
  });
};

const validateTime = (timeIn, timeOut) => {
  timeIn.addEventListener('change', (evt) => {
    Array.from(timeOut.options).forEach((option) => {
      if (option.value === evt.target.value) {
        option.selected = true;
      }
    });
  });
};

const resetRoomSelect = () => {
  Array.from(offerGuestsSelect.options).forEach((option) => {
    option.disabled = true;
    if (option.value === DEFAULT_OPTION_ROOM_SELECT) {
      option.disabled = false;
      option.selected = true;
    }
  });
};

const resetForm = () => {
  adForm.reset();
  avatarPreview.src = imgDefault;
  housePreview.src = imgDefault;
  resetRoomSelect();
  offerPriceInput.placeholder = PRICE_PLACEHOLDER;
  offerAddressInput.value = transformLatLng(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
};

const resetPage = () => {
  resetForm();
  resetFilters();
  resetMap();
  setDefaultAddress();
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  uploadOffer(onSuccessSendForm, onErrorSendForm, new FormData(evt.target));
});

validateTitle();
validatePrice();
validateRoomsGuests();
validateTypePrice();
validateTime(offerTimeIn, offerTimeOut);
validateTime(offerTimeOut, offerTimeIn);

uploadPhotos(avatarChooser, avatarPreview);
uploadPhotos(houseChooser, housePreview);

export { getInActive, getActive, getActiveFilters, validateTitle, validatePrice, validateRoomsGuests, validateTypePrice, validateTime, resetPage, roomTypes };
