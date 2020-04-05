import {createSectionInfoTemplate} from './components/section-info.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createTripInfoCostTemplate} from './components/trip-cost.js';
import {createTripControlMenuTemplate} from './components/trip-control.js';
import {createTripMainFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sorting.js';
import {createTripEventsFormTemplate} from './components/events.js';
import {createEventDetailsTemplate} from './components/event-details.js';
import {createEventDetailsOffersTemplate} from './components/event-offers.js';
import {createEventDetailsDestinationTemplate} from './components/event-destination.js';
import {createTripDaysTemplate} from './components/days.js';
import {createDayContentTemplate} from './components/day-content.js';
import {createDayPointTemplate} from './components/day-point.js';
import {createDayEventOfferTemplate} from './components/day-event-offer.js';

const DAY_COUNT = 4;
const POINT_COUNT = 3;
const OFFER_COUNT = 2;

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

const tripInfo = document.querySelector(`.trip-info`);

render(tripInfo, createTripInfoTemplate(), `beforeend`);
render(tripInfo, createTripInfoCostTemplate(), `beforeend`);

render(controlMenu, createTripControlMenuTemplate(), `afterend`);
render(tripControl, createTripMainFilterTemplate(), `beforeend`);

// main
render(tripEvents, createTripSortTemplate(), `beforeend`);
render(tripEvents, createTripEventsFormTemplate(), `beforeend`);

const eventForm = document.querySelector(`.event`);

render(eventForm, createEventDetailsTemplate(), `beforeend`);

const eventDetails = eventForm.querySelector(`.event__details`);

render(eventDetails, createEventDetailsOffersTemplate(), `beforeend`);
render(eventDetails, createEventDetailsDestinationTemplate(), `beforeend`);

render(tripEvents, createTripDaysTemplate(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

for (let i = 0; i < DAY_COUNT; i++) {
  render(tripDays, createDayContentTemplate(), `afterbegin`);

  const tripEventsList = document.querySelector(`.trip-events__list`);

  for (let j = 0; j < POINT_COUNT; j++) {
    render(tripEventsList, createDayPointTemplate(), `afterbegin`);

    const eventOffersList = tripEventsList.querySelector(`.event__selected-offers`);

    for (let k = 0; k < OFFER_COUNT; k++) {
      render(eventOffersList, createDayEventOfferTemplate(), `beforeend`);
    }
  }
}
