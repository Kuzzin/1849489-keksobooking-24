import {TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS, SIMILAR_ADS} from './data.js';
import {getRandomNumber, getRandomFraction, getRandomArrayElement, getRandomArrayFull} from './randomizer.js';
//import './map-offer.js'; попытка подключения модуля

const createAds = () => {
  const randomAvatarId = getRandomNumber(1, 10);
  const randomLocationLat = getRandomFraction(35.65000, 35.70000, 5);
  const randomLocationLng = getRandomFraction(139.70000, 139.80000, 5);
  const ad = {
    author: {
      avatar: `img/avatars/user${randomAvatarId <= 9 ? `0${randomAvatarId}` : randomAvatarId}.png`,
    },
    offer: {
      title: 'Ля какое предложение',
      address: {
        lat: randomLocationLat,
        lng: randomLocationLng,
      },
      price: getRandomNumber(100, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayFull(FEATURES),
      description: 'Ля какое помещение',
      photos: getRandomArrayFull(PHOTOS),
    },
    location: {
      lat: randomLocationLat,
      lng: randomLocationLng,
    },
  };
  return ad;
};

// eslint-disable-next-line no-unused-vars
const similarAds = Array.from({length: SIMILAR_ADS}, createAds);

//Это должно быть в модуле map-offer.js, но я не могу корректно его подключить (наверняка ошибка прям явная, но я не вижу)
//+ не знаю, как предусмотреть, что поле может будет пустыи и его нужно скрыть.
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

mapCanvas.appendChild(offerElement);

//export {similarAds}; попытка подключить модули
