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

export {getRandomNumber, getRandomFraction, getRandomArrayElement, getRandomArrayFull};
