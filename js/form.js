const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_LENGTH = 0;
const MAX_PRICE_LENGTH = 1000000;


const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const offerRoomsSelect = document.querySelector('#room_number');
const offerGuestsSelect = document.querySelector('#capacity');
const offerHousingType = document.querySelector('#type');
const offerTimeIn = document.querySelector('#timein');
const offerTimeOut = document.querySelector('#timeout');


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

    if (priceValue < MIN_PRICE_LENGTH) {
      offerPriceInput.setCustomValidity('Слишком маленькая цена для выбранного типа жилья.');
    } else if (priceValue > MAX_PRICE_LENGTH) {
      offerPriceInput.setCustomValidity('Цена не может превышать 1 000 000 руб.');
    } else {
      offerPriceInput.setCustomValidity('');
    }

    offerPriceInput.reportValidity();
  });
};

/*//Заводим словарь:

const RoomsValue = {

  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

//После, опираемся на него для валидации:

const onRoomChange = (evt) => {

  optionCapacityGuests.forEach((option) => {

    option.disabled = true;
  });

  RoomsValue[evt.target.value].forEach((seatsAmount) => {

    optionCapacityGuests.forEach((option) => {

      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};*/

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

//Валидация поля цены от типа жилья (не знаю, как привязать к мин значению)
const validateTypePrice = () => {
  offerHousingType.addEventListener('change', (evt) => {
    const value = evt.target.value;

    if (value === 'bungalow') {
      offerPriceInput.setAttribute('minLength', '0');
      offerPriceInput.setAttribute('placeholder', '0');

    }
    if (value === 'flat') {
      offerPriceInput.setAttribute('minLength', '1 000');
      offerPriceInput.setAttribute('placeholder', '1 000');
    }
    if (value === 'hotel') {
      offerPriceInput.setAttribute('minLength', '3 000');
      offerPriceInput.setAttribute('placeholder', '3 000');
    }
    if (value === 'house') {
      offerPriceInput.setAttribute('minLength', '5 000');
      offerPriceInput.setAttribute('placeholder', '5 000');
    }
    if (value === 'palace') {
      offerPriceInput.setAttribute('minLength', '10 000');
      offerPriceInput.setAttribute('placeholder', '10 000');
    }
  });
};

//Валидация полей время заезда и выезда
const validateTimeIn = () => {
  offerTimeIn.addEventListener('change', () => {
    const TimeInValue = offerTimeIn.value;

    if (TimeInValue === '12:00') {
      offerTimeOut.options[0].selected = true;
    }
    if (TimeInValue === '13:00') {
      offerTimeOut.options[1].selected = true;
    }
    if (TimeInValue === '14:00') {
      offerTimeOut.options[2].selected = true;
    }
  });
};

const validateTimeOut = () => {
  offerTimeOut.addEventListener('change', () => {
    const TimeOutValue = offerTimeOut.value;

    if (TimeOutValue === '12:00') {
      offerTimeIn.options[0].selected = true;
    }
    if (TimeOutValue === '13:00') {
      offerTimeIn.options[1].selected = true;
    }
    if (TimeOutValue === '14:00') {
      offerTimeIn.options[2].selected = true;
    }
  });
};

export {getInActive, getActive, validateTitle, validatePrice, validateRoomsGuests, validateTypePrice, validateTimeIn, validateTimeOut};
