import { showErrorPopup } from './error.js';
import {getInActive, getActive, getActiveFilters } from './form.js';
import { initializateMap, createMarkers } from './map.js';
import './upload-photo.js';

const mapFilters = document.querySelector('.map__filters');

let originalOffers = [];

const onSuccessFetchOffers = (data) => {
  originalOffers = data;
  createMarkers(data);
  getActiveFilters();
  mapFilters.addEventListener('change', () => {
    createMarkers(data);
  });
};

const onErrorFetchOffers = (err) => {
  showErrorPopup(err);
};

getInActive();
initializateMap(getActive, onSuccessFetchOffers, onErrorFetchOffers);

export {originalOffers};
