const TYPE =  ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator','conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const roomTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const SIMILAR_ADS = 10;

const getRandomNumber = function (min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
};

function getRandomFraction (min, max, fraction){
  if (max <= min || min < 0){
    throw Error('Неверно указан диапазон чисел!');
  }else{
    const random = Math.random() * (max - min) + min;
    return random.toFixed(fraction);
  }
}

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomArrayFull = (ArrayFull) => ArrayFull.slice(0, getRandomNumber(1, ArrayFull.length));

//Функция, которая создает массив из объектов
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
        lat: null,//randomLocationLat,
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
//Функция, которая создает массив из 10 элементов
const getSimilarAds = () => Array.from({length: SIMILAR_ADS}, createAds);

export {getSimilarAds, getRandomNumber, roomTypes};
