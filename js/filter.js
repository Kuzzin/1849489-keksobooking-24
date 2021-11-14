const COUNT_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const PriceValue = {
  low: 9999,
  middle: 10000,
  high: 50000,
};

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFilters = document.querySelector('.map__filters');

const getCategoryPrice = (price) => {
  if (price <= PriceValue.low) {
    return 'low';
  }
  if (price >= PriceValue.high) {
    return 'high';
  }
  return 'middle';
};

const filterByType = (type) => type === housingType.value || housingType.value === DEFAULT_VALUE;
const filterByPrice = (price) => getCategoryPrice(price) === housingPrice.value || housingPrice.value === DEFAULT_VALUE;
const filterByRooms = (rooms) => String(rooms) === housingRooms.value || housingRooms.value === DEFAULT_VALUE;
const filterByGuests = (guests) => String(guests) === housingGuests.value || housingGuests.value === DEFAULT_VALUE;
const filterByFeatures = (features) => {
  const featuresCheckboxes = document.querySelectorAll('input[name="features"]:checked');
  const selectedCheckboxes = Array.from(featuresCheckboxes).map((nodeFeature) => nodeFeature.value);
  if (!selectedCheckboxes) {
    return true;
  }
  if (!features) {
    return false;
  }
  return selectedCheckboxes.every((feature) => features.includes(feature));
};

const getFilteredOffers = (data) => {
  const filteredOffers = [];
  data.forEach((offer) => {
    if (filterByType(offer.offer.type)
      && filterByGuests(offer.offer.guests)
      && filterByRooms(offer.offer.rooms)
      && filterByPrice(offer.offer.price)
      && filterByFeatures(offer.offer.features)
    ) {
      filteredOffers.push(offer);
    }
  });
  return filteredOffers.slice(0, COUNT_OFFERS);
};

const resetFilters = () => {
  mapFilters.reset();
};

export {getFilteredOffers, resetFilters};
