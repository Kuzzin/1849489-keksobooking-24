import { transformLatLng} from './utils/transform-lat-lng.js';
import { fetchOffers } from './fetch.js';
import { createNodeFromTemplate } from './card.js';
import { INITIAL_COORDS } from './const.js';
import { getFilteredOffers } from './filter.js';
import { debounce } from './utils/debounce.js';
import { originalOffers } from './main.js';

const TIMEOUT = 500;
const MAP_ZOOM = 10;

const addressInput = document.querySelector('#address');

//Добавление в инпут координат по обработчику якоря
const setDefaultAddress = () => {
  addressInput.value = transformLatLng(INITIAL_COORDS.lat, INITIAL_COORDS.lng);
};

setDefaultAddress();

const map = L.map('map-canvas');
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Создание слоя с группой меток похожих объявлений
const markerGroupUsual = L.layerGroup().addTo(map);

//Создание метки для каждого похожего объявления
const createMarker = (offer) => {
  const {lat, lng} = offer.location;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({lat, lng}, {icon});

  //добавление в слой и вывод попапа с данными
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
  //Создание главной метки
  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPin = L.marker(INITIAL_COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPin.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressInput.value = transformLatLng(lat, lng);
  });
  return mainPin;
};

const mainPinMarker = createMainPin();

const initializateMap = (onGetActive, onSuccess, onError) => {
  map
    .on('load', () => {
      onGetActive(); //Активное состояние формы
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

export {initializateMap, createMarker, createMarkers, resetMap, setDefaultAddress};
