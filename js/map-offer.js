// Нифига не работает

/*import {similarAds} from './main.js';
import {getRandomNumber} from './randomizer.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const offerElement = similarOfferTemplate.cloneNode(true);

const ads = similarAds[getRandomNumber(0, similarAds.length)];
offerElement.querySelector('.popup__title').textContent = ads.offer.title;
offerElement.querySelector('.popup__text--address').textContent = `${ads.offer.address.lat  } ${  ads.offer.address.lng}`;
offerElement.querySelector('.popup__text--price').textContent = `${ads.offer.price  } ₽/ночь`;
const rusType = () => {
  switch (ads.offer.type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};
offerElement.querySelector('.popup__type').textContent = rusType();
offerElement.querySelector('.popup__text--capacity').textContent = `${ads.offer.rooms  } комнат(ы) для ${  ads.offer.guests  } гостей(я)`;
offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ads.offer.checkin  }, выезд до ${  ads.offer.checkout  } гостей(я)`;
const listFeatures = offerElement.querySelector('.popup__features');
listFeatures.innerHTML = '';
ads.offer.features.forEach((value) => {
  const li = document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add(`popup__feature--${value}`);
  listFeatures.appendChild(li);
});
offerElement.querySelector('.popup__description').textContent = ads.offer.description;
const listPhotos = offerElement.querySelector('.popup__photos');
listPhotos.innerHTML = '';
ads.offer.photos.forEach((value) => {
  const img = document.createElement('img');
  img.classList.add('popup__photo');
  img.src = value;
  img.width='45';
  img.height='40';
  img.alt='Фотография жилья';
  listPhotos.appendChild(img);
});
offerElement.querySelector('.popup__avatar').src = ads.author.avatar;
// как предусмотреть отсутсвие инфо (скрыть поле)??
mapCanvas.appendChild(offerElement);

export {mapCanvas, offerElement};*/
