import { transformLatLng } from './utils/transform-lat-lng.js';
import { fetchOffers } from './api.js';
import { createNodeFromTemplate } from './card.js';
import { INITIAL_COORDS } from './const.js';
import { getFilteredOffers } from './filter.js';
import { debounce } from './utils/debounce.js';
import { originalOffers } from './main.js';

const MAIN_MARKER_SIZE = [50, 50];
const MAIN_MARKER_ANCHOR = [50, 50];
const SIMILAR_MARKER_SIZE = [40, 40];
const SIMILAR_MARKER_ANCHOR = [20, 40];


const TIMEOUT = 500;
const MAP_ZOOM = 10;

const addressInput = document.querySelector('#address');

const setDefaultAddress = () => {
  addressInput.value = transformLatLng(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
};

const map = L.map('map-canvas');
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroupUsual = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const { lat, lng } = offer.location;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: SIMILAR_MARKER_SIZE,
    iconAnchor: SIMILAR_MARKER_ANCHOR,
  });

  const marker = L.marker({ lat, lng }, { icon });

  marker
    .addTo(markerGroupUsual)
    .bindPopup(createNodeFromTemplate(offer));
};

const createMarkers = debounce((data) => {
  const filteredOffers = getFilteredOffers(data);
  markerGroupUsual.clearLayers();

  filteredOffers.forEach((offer) => {
    createMarker(offer);
  });
}, TIMEOUT);

const createMainPin = () => {
  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: MAIN_MARKER_SIZE,
    iconAnchor: MAIN_MARKER_ANCHOR,
  });

  const mainPin = L.marker(INITIAL_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPin.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    addressInput.value = transformLatLng(lat, lng);
  });
  return mainPin;
};

const mainPinMarker = createMainPin();

const initializateMap = (onGetActive, onSuccess, onError) => {
  map
    .on('load', () => {
      onGetActive();
      fetchOffers(onSuccess, onError);
    })
    .setView(INITIAL_COORDS, MAP_ZOOM);

  mainPinMarker.addTo(map);
};

const resetMap = () => {
  mainPinMarker.setLatLng(INITIAL_COORDS);
  map.setView(INITIAL_COORDS, MAP_ZOOM);
  createMarkers(originalOffers);
};

setDefaultAddress();


export { initializateMap, createMarker, createMarkers, resetMap, setDefaultAddress };
