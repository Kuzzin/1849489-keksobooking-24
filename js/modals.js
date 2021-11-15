import { addNodeToDOM } from './card.js';
import { resetPage } from './form.js';

const ESC = 'Escape';

const onModalClick = () => {
  // eslint-disable-next-line no-use-before-define
  onCloseModal();
};

const onModalEscapePress = (evt) => {
  if (evt.key === ESC) {
    // eslint-disable-next-line no-use-before-define
    onCloseModal();
  }
};

const onCloseModal = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onModalEscapePress);
  document.removeEventListener('click', onModalClick);
};

const onSuccessSendForm = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  resetPage();
  document.addEventListener('keydown', onModalEscapePress);
  document.addEventListener('click', onModalClick);

  addNodeToDOM(successElement, document.body);
};

const onErrorSendForm = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onModalEscapePress);
  document.addEventListener('click', onModalClick);
  addNodeToDOM(errorElement, document.body);
};

export {onSuccessSendForm, onErrorSendForm};
