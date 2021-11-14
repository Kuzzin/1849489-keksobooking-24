import { addNodeToDOM } from './card.js';

const showErrorPopup = (err) => {
  const errorTemplate = document.querySelector('#errorFetch').content.querySelector('.errorFetch');
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage =errorElement.querySelector('.errorFetch__message');
  errorMessage.textContent = `Ошибка загрузки данных (${  err})`;
  addNodeToDOM(errorElement, document.body);
};

export {showErrorPopup};
