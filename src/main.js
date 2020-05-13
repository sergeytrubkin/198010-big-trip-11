import TripController from './controllers/trip.js';
import TripControlMenuComponent from './components/trip-control.js';
import TripMainFilterComponent from './components/filter.js';
import SectionInfoComponent from './components/section-info.js';
import {generatePoints} from './mock/point.js';
import {RenderPosition, render} from './utils/render.js';

// const DAY_COUNT = 7;
const POINT_COUNT = 5;
const points = generatePoints(POINT_COUNT);

const siteHeader = document.querySelector(`.trip-main`);
const tripControl = document.querySelector(`.trip-controls`);
const controlMenu = tripControl.querySelector(`h2`);
const pageMainContent = document.querySelector(`.page-main .page-body__container`);

// header
render(siteHeader, new SectionInfoComponent(), RenderPosition.AFTERBEGIN);
render(controlMenu, new TripControlMenuComponent(), RenderPosition.AFTEREND);
render(tripControl, new TripMainFilterComponent());

// main
const tripController = new TripController(pageMainContent);
tripController.renderTrips(points);
