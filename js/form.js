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

export {getInActive, getActive};
