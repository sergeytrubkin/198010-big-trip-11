import {createSectionInfoTemplate} from './components/section-info.js';
// import {createTripInfoTemplate} from './components/trip-info.js';
// import {createTripInfoCostTemplate} from './components/trip-cost.js';
import {createTripControlMenuTemplate} from './components/trip-control.js';
import {createTripMainFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sorting.js';
import {createEventEditTemplate} from './components/event-edit.js';
// import {createEventDetailsTemplate} from './components/event-details.js';
// import {createEventDetailsOffersTemplate} from './components/event-offers.js';
// import {createEventDescriptionTemplate} from './components/event-description.js';
import {createTripDaysTemplate} from './components/days.js';
// import {createDayContentTemplate} from './components/day-content.js';
// import {createDayPointTemplate} from './components/day-point.js';
// import {createDayEventOfferTemplate} from './components/day-event-offer.js';
import {createDayTemplate} from './components/day.js';
import {generatePoints} from './mock/point.js';

const DAY_COUNT = 7;
const POINT_COUNT = 5;
const points = generatePoints(POINT_COUNT);

// const POINT_COUNT = 3;
// const OFFER_COUNT = 2;

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

// const tripInfo = document.querySelector(`.trip-info`);

// render(tripInfo, createTripInfoTemplate(), `beforeend`);
// render(tripInfo, createTripInfoCostTemplate(), `beforeend`);

render(controlMenu, createTripControlMenuTemplate(), `afterend`);
render(tripControl, createTripMainFilterTemplate(), `beforeend`);

// main
render(tripEvents, createTripSortTemplate(), `beforeend`);
render(tripEvents, createEventEditTemplate(points[0]), `beforeend`);

// const eventForm = document.querySelector(`.event`);

// render(eventForm, createEventDetailsTemplate(), `beforeend`);

// const eventDetails = eventForm.querySelector(`.event__details`);

// render(eventDetails, createEventDetailsOffersTemplate(), `beforeend`);
// render(eventDetails, createEventDescriptionTemplate(), `beforeend`);

render(tripEvents, createTripDaysTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);


// render(tripDays, createDayTemplate(points), `beforeend`);


for (let i = 0; i < DAY_COUNT; i++) {
  render(tripDays, createDayTemplate(points, i + 1), `beforeend`);

  // const tripEventsList = document.querySelector(`.trip-events__list`);

  // for (let j = 0; j < POINT_COUNT; j++) {
  //   render(tripEventsList, createDayPointTemplate(), `afterbegin`);

  //   const eventOffersList = tripEventsList.querySelector(`.event__selected-offers`);

  //   for (let k = 0; k < OFFER_COUNT; k++) {
  //     render(eventOffersList, createDayEventOfferTemplate(), `beforeend`);
  //   }
  // }
}
