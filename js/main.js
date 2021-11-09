import {getSimilarAds} from './data.js';
import {createNodeFromTemplate, addNodeToDOM} from './card.js';
import {getInActive, getActive, validateTitle, validatePrice, validateRoomsGuests, validateTypePrice, validateTimeIn, validateTimeOut} from './form.js';

const similarAds = getSimilarAds();

const nodeFromTemplate = createNodeFromTemplate(similarAds[0]);

const mapCanvas = document.querySelector('#map-canvas');

addNodeToDOM(nodeFromTemplate, mapCanvas);
//mapCanvas.appendChild(nodeFromTemplate);

getInActive();

getActive();

validateTitle();
validatePrice();
validateRoomsGuests();
validateTypePrice();
validateTimeIn();
validateTimeOut();
