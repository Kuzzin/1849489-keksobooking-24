import {TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS, SIMILAR_ADS} from './data.js';
import {getRandomNumber, getRandomFraction, getRandomArrayElement, getRandomArrayFull} from './randomizer.js';


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
      description: 'Ля какое место помещение',
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
