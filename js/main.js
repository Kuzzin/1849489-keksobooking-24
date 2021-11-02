import {getSimilarAds} from './data.js';
import {createNodeFromTemplate, addNodeToDOM} from './card.js';

const similarAds = getSimilarAds();

const nodeFromTemplate = createNodeFromTemplate(similarAds[0]);

const mapCanvas = document.querySelector('#map-canvas');

addNodeToDOM(nodeFromTemplate, mapCanvas);
//mapCanvas.appendChild(nodeFromTemplate);

