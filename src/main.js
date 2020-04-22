import {createSectionInfoTemplate} from './components/section-info.js';
import {createTripControlMenuTemplate} from './components/trip-control.js';
import {createTripMainFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sorting.js';
import {createEventEditTemplate} from './components/event-edit.js';
import {createTripDaysTemplate} from './components/days.js';
import {createDayTemplate} from './components/day.js';
import {generatePoints} from './mock/point.js';

const DAY_COUNT = 7;
const POINT_COUNT = 5;
const points = generatePoints(POINT_COUNT);

// функция отрисовки компонента
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.trip-main`);
const tripControl = document.querySelector(`.trip-controls`);
const controlMenu = tripControl.querySelector(`h2`);
const pageMainContent = document.querySelector(`.page-main .page-body__container`);
const tripEvents = pageMainContent.querySelector(`.trip-events`);

// header
render(siteHeader, createSectionInfoTemplate(), `afterbegin`);
render(controlMenu, createTripControlMenuTemplate(), `afterend`);
render(tripControl, createTripMainFilterTemplate(), `beforeend`);

// main
render(tripEvents, createTripSortTemplate(), `beforeend`);
render(tripEvents, createEventEditTemplate(points[0]), `beforeend`);
render(tripEvents, createTripDaysTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

for (let i = 0; i < DAY_COUNT; i++) {
  render(tripDays, createDayTemplate(points, i + 1), `beforeend`);
}
