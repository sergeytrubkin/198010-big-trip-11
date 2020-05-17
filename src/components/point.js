import AbstractComponent from '../components/abstract-component.js';
import {castTimeFormat, formatTime, formatDate} from '../utils/common.js';

const MILLISECOND_IN_SECOND = 1000;
const SECOND_IN_MINUTE = 60;
const MINUTE_IN_HOUR = 60;
const MINUTE_IN_DAY = 1440;
const HOUR_IN_DAY = 24;

const createDayPointOfferTemplate = (offer) => {
  const {title, cost} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </li>`);
};


const createPointTemplate = (point) => {
  const {pointType, destination, startTimePoint, endTimePoint, pointPrice, offers} = point;

  const startTimeISO = `${formatDate(startTimePoint, true)}T${formatTime(startTimePoint)}`;
  const endTimeISO = `${formatDate(endTimePoint, true)}T${formatTime(endTimePoint)}`;
  const startTimePointForUser = formatTime(startTimePoint);
  const endTimePointForUser = formatTime(endTimePoint);

  const pointDuration = (startTime, endTime) => {

    const diffTimeMinute = (endTime - startTime) / MILLISECOND_IN_SECOND / SECOND_IN_MINUTE;
    const correctTimeMinutes = castTimeFormat(Math.floor(diffTimeMinute % MINUTE_IN_HOUR));
    const correctTimeHour = castTimeFormat(Math.floor((diffTimeMinute / MINUTE_IN_HOUR) % HOUR_IN_DAY));
    const CorrectTimeDay = castTimeFormat(Math.floor(diffTimeMinute / MINUTE_IN_DAY));
    let duration = ``;

    if (diffTimeMinute < MINUTE_IN_HOUR) {
      duration = `${correctTimeMinutes}M`;
    } else if (diffTimeMinute >= MINUTE_IN_HOUR && diffTimeMinute < MINUTE_IN_DAY) {
      duration = `${correctTimeHour}H ${correctTimeMinutes}M`;
    } else if (diffTimeMinute > MINUTE_IN_DAY) {
      duration = `${CorrectTimeDay}D ${correctTimeHour}H ${correctTimeMinutes}M`;
    }

    return duration;
  };

  const duration = pointDuration(startTimePoint, endTimePoint);

  const offerMarkup = offers
    .map((offer) => {
      return createDayPointOfferTemplate(offer);
    })
    .slice(0, 3)
    .join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType} to ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeISO}">${startTimePointForUser}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeISO}">${endTimePointForUser}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class Event extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
