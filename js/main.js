const getRandomNumber = function (min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
};
getRandomNumber(0, 6);


const getRandomFractionNumber = function (min, max, fraction) {
  if (max && fraction > min && min >= 0 && max && fraction > 0) {
    return min + Math.random() * (max + 1 - min).toFixed(fraction);
  }
  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
};
getRandomFractionNumber(2, 10, 7.554);
