const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_LENGTH = 0;
const MAX_PRICE_LENGTH = 1000000;


const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const offerRoomsSelect = document.querySelector('#room_number');
const offerGuestsSelect = document.querySelector('#capacity');


//поиск по классу элемента и добавление ему disabled
const getInActive = () => {
  const adForm = document.querySelector('.ad-form');
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
  const adForm = document.querySelector('.ad-form');
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
      offerTitleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - titleLength } симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      offerTitleInput.setCustomValidity(`Удалите лишние ${  titleLength - MAX_TITLE_LENGTH } симв.`);
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

    if (priceValue <= MIN_PRICE_LENGTH) {
      offerPriceInput.setCustomValidity('Цена не может быть меньше или равна 0 руб.');
    } else if (priceValue > MAX_PRICE_LENGTH) {
      offerPriceInput.setCustomValidity('Цена не может превышать 1 000 000 руб.');
    } else {
      offerPriceInput.setCustomValidity('');
    }

    offerPriceInput.reportValidity();
  });
};

//Валидация полей количества комнат и гостей
const validateRoomsGuests = () => {
  offerRoomsSelect.addEventListener('change', (evt) => {
    const value = evt.target.value;

    if (value === '1') {
      offerGuestsSelect.options[2].selected = true;
      offerGuestsSelect.options[2].disabled = false;
      offerGuestsSelect.options[0].disabled = true;
      offerGuestsSelect.options[1].disabled = true;
      offerGuestsSelect.options[3].disabled = true;
    }
    if (value === '2') {
      offerGuestsSelect.options[1].selected = true;
      offerGuestsSelect.options[2].selected = true;
      offerGuestsSelect.options[1].disabled = false;
      offerGuestsSelect.options[2].disabled = false;
      offerGuestsSelect.options[3].disabled = true;
      offerGuestsSelect.options[0].disabled = true;
    }
    if (value === '3') {
      offerGuestsSelect.options[0].selected = true;
      offerGuestsSelect.options[1].selected = true;
      offerGuestsSelect.options[2].selected = true;
      offerGuestsSelect.options[0].disabled = false;
      offerGuestsSelect.options[1].disabled = false;
      offerGuestsSelect.options[2].disabled = false;
      offerGuestsSelect.options[3].disabled = true;
    }
    if (value === '100') {
      offerGuestsSelect.options[3].selected = true;
      offerGuestsSelect.options[3].disabled = false;
      offerGuestsSelect.options[0].disabled = true;
      offerGuestsSelect.options[1].disabled = true;
      offerGuestsSelect.options[2].disabled = true;
    }

  });
};

export {getInActive, getActive, validateTitle, validatePrice, validateRoomsGuests};


