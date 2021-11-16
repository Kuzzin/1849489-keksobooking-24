import { roomTypes } from './form.js';

const createPhotoNode = (src) => {
  const img = document.createElement('img');
  img.classList.add('popup__photo');
  img.src = src;
  img.width = '45';
  img.height = '40';
  img.alt = 'Фотография жилья';
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
  if (!features || features.length === 0) {
    listFeatures.style.display = 'none';
  } else {
    listFeatures.innerHTML = '';
    features.forEach((feature) => {
      const featureNode = createFeatureNode(feature);
      listFeatures.appendChild(featureNode);
    });
  }
};

const renderPhotos = (photos, offerElement) => {
  const listPhotos = offerElement.querySelector('.popup__photos');
  if (!photos || photos.length === 0) {
    listPhotos.style.display = 'none';
  } else {
    listPhotos.innerHTML = '';
    photos.forEach((src) => {
      const photoNode = createPhotoNode(src);
      listPhotos.appendChild(photoNode);
    });
  }
};

const checkIsEmptyString = (string, node, attr) => {
  if (string === '') {
    node.style.display = 'none';
  } else {
    node[attr] = string;
  }
};

const createNodeFromTemplate = (data) => {
  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = similarOfferTemplate.cloneNode(true);
  checkIsEmptyString(data.offer.title, offerElement.querySelector('.popup__title'), 'textContent');

  checkIsEmptyString(data.offer.address, offerElement.querySelector('.popup__text--address'), 'textContent');

  offerElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  if (data.offer.price === null) {
    offerElement.querySelector('.popup__text--price').style.display = 'none';
  }

  checkIsEmptyString(roomTypes[data.offer.type], offerElement.querySelector('.popup__type'), 'textContent');

  offerElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнат(ы) для ${data.offer.guests} гостей(я)`;
  if (data.offer.rooms === null || data.offer.guests === null) {
    offerElement.querySelector('.popup__text--capacity').style.display = 'none';
  }

  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout} гостей(я)`;
  if (data.offer.checkin === '' || data.offer.checkout === '') {
    offerElement.querySelector('.popup__text--time').style.display = 'none';
  }

  renderFeatures(data.offer.features, offerElement);
  checkIsEmptyString(data.offer.description, offerElement.querySelector('.popup__description'), 'textContent');
  renderPhotos(data.offer.photos, offerElement);
  checkIsEmptyString(data.author.avatar, offerElement.querySelector('.popup__avatar'), 'src');

  return offerElement;
};

const addNodeToDOM = (node, container) => {
  container.appendChild(node);
};

export { createNodeFromTemplate, addNodeToDOM };
