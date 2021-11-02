import {roomTypes} from './data.js';

const createPhotoNode = (src) => {
  const img = document.createElement('img');
  img.classList.add('popup__photo');
  img.src = src;
  img.width='45';
  img.height='40';
  img.alt='Фотография жилья';
  return img;
};

const createFeatureNode = (feature) => {
  const li = document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add(`popup__feature--${feature}`);
  return li;
};

const renderFeatures = (features, offerElement) => {
  const listFeatures = offerElement.querySelector('.popup__features');
  listFeatures.innerHTML = '';
  features.forEach((feature) => {
    const featureNode = createFeatureNode(feature);
    listFeatures.appendChild(featureNode);
  });
};

const renderPhotos = (photos, offerElement) => {
  const listPhotos = offerElement.querySelector('.popup__photos');
  listPhotos.innerHTML = '';
  photos.forEach((src) => {
    const photoNode = createPhotoNode(src);
    listPhotos.appendChild(photoNode);
  });
};

//Функция, которая отрисовывает рандомный элемент массива в карте
const createNodeFromTemplate = (kaka) => {

  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = similarOfferTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = kaka.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = `${kaka.offer.address.lat  } ${  kaka.offer.address.lng}`;
  offerElement.querySelector('.popup__text--price').textContent = `${kaka.offer.price  } ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = roomTypes[kaka.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${kaka.offer.rooms  } комнат(ы) для ${  kaka.offer.guests  } гостей(я)`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${  kaka.offer.checkin  }, выезд до ${  kaka.offer.checkout  } гостей(я)`;
  renderFeatures(kaka.offer.features, offerElement);
  offerElement.querySelector('.popup__description').textContent = kaka.offer.description;
  renderPhotos(kaka.offer.photos, offerElement);
  offerElement.querySelector('.popup__avatar').src = kaka.author.avatar;
  return offerElement;
};
//Функция, которая ренедерит ноду в DOM
const addNodeToDOM = (node, container) => {
  container.appendChild(node);
};

export {createNodeFromTemplate, addNodeToDOM};
