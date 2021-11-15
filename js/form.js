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
const PRICE_PLACEHOLDER = 5000;

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const housePriceTypes = {
  house: '5000',
  palace: '10000',
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
};

const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const offerRoomsSelect = document.querySelector('#room_number');
const offerGuestsSelect = document.querySelector('#capacity');
const offerHousingType = document.querySelector('#type');
const offerTimeIn = document.querySelector('#timein');
const offerTimeOut = document.querySelector('#timeout');
const offerDescription = document.querySelector('#description');
const offerFeatures = document.querySelectorAll('.features__checkbox');
const offerAddressInput = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo img');

//поиск по классу элемента и добавление ему disabled
const getInActive = () => {
  adForm.classList.add('ad-form--disabled');
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');
  const interactiveFields = document.querySelectorAll('form.ad-form > fieldset');
  interactiveFields.forEach((field) => {
    field.setAttribute('disabled', 'disabled');
  });
  const interactiveMapEl = document.querySelectorAll('form.map__filters > select');
  interactiveMapEl.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });
};

//поиск по классу элемента и удаление disabled
const getActive = () => {
  adForm.classList.remove('ad-form--disabled');
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  //поиск по классу элемента и удаление ему disabled
  const interactiveFields = document.querySelectorAll('form.ad-form > fieldset');
  interactiveFields.forEach((field) => {
    field.removeAttribute('disabled');
  });
  const interactiveMapEl = document.querySelectorAll('form.map__filters > select');
  interactiveMapEl.forEach((select) => {
    select.removeAttribute('disabled');
  });
};

//Валидация поля Заголовка
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

//Валидация поля цены
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

//Валидация полей количества комнат и гостей
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

//Валидация поля цены от типа жилья
const validateTypePrice = () => {

  offerHousingType.addEventListener('change', (evt) => {
    const value = evt.target.value;
    offerPriceInput.setAttribute('min', housePriceTypes[value]);
    offerPriceInput.setAttribute('placeholder', housePriceTypes[value]);
  });
};

//Валидация полей время заезда и выезда
const validateTimeIn = () => {
  offerTimeIn.addEventListener('change', (evt) => {
    Array.from(offerTimeOut.options).forEach((option) => {
      if (option.value === evt.target.value) {
        option.selected = true;
      }
    });
  });
};

const validateTimeOut = () => {
  offerTimeOut.addEventListener('change', (evt) => {
    Array.from(offerTimeIn.options).forEach((option) => {
      if (option.value === evt.target.value) {
        option.selected = true;
      }
    });
  });
};

const resetForm = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  housePreview.src = 'img/muffin-grey.svg';
  offerTitleInput.value = '';
  offerTimeOut.options[0].selected = true;
  offerTimeIn.options[0].selected = true;
  offerGuestsSelect.options[2].selected = true;
  offerHousingType.options[1].selected = true;
  offerRoomsSelect.options[0].selected = true;
  offerPriceInput.value = '';
  offerPriceInput.placeholder = PRICE_PLACEHOLDER;
  offerDescription.value = '';
  offerAddressInput.value = transformLatLng(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
  offerFeatures.forEach((feature) => {
    feature.checked = false;
  });
};

const resetPage = () => {
  resetForm();
  resetFilters();
  resetMap();
  setDefaultAddress();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  uploadOffer(onSuccessSendForm, onErrorSendForm, new FormData(evt.target));
});

adForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  resetPage();
});

validateTitle();
validatePrice();
validateRoomsGuests();
validateTypePrice();
validateTimeIn();
validateTimeOut();

uploadPhotos(avatarChooser, avatarPreview);
uploadPhotos(houseChooser, housePreview);

export { getInActive, getActive, validateTitle, validatePrice, validateRoomsGuests, validateTypePrice, validateTimeIn, validateTimeOut, resetPage };
