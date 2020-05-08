import TripController from './controllers/trip-controller.js';
import TripControlMenuComponent from './components/trip-control.js';
import TripMainFilterComponent from './components/filter.js';
import SectionInfoComponent from './components/section-info.js';
import {generateEvents} from './mock/event.js';
import {RenderPosition, render} from './utils/render.js';

// const DAY_COUNT = 7;
const EVENT_COUNT = 5;
const events = generateEvents(EVENT_COUNT);

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
tripController.renderTrips(events);
