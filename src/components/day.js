import {MONTHS} from '../const.js';
import {castTimeFormat, formatTime, formatDate} from '../util.js';

const MILLISECOND_IN_SECOND = 1000;
const SECOND_IN_MINUTE = 60;
const MINUTE_IN_HOUR = 60;
const MINUTE_IN_DAY = 1440;
const HOUR_IN_DAY = 24;

const createDayEventOfferTemplate = (offer) => {
  const {title, cost} = offer;

  return (`
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${cost}</span>
    </li>`);
};


const createDayPointTemplate = (point) => {
  const {eventType, destination, startTimeEvent, endTimeEvent, eventPrice, offers} = point;

  const startTimeISO = `${formatDate(startTimeEvent, true)}T${formatTime(startTimeEvent)}`;
  const endTimeISO = `${formatDate(endTimeEvent, true)}T${formatTime(endTimeEvent)}`;
  const startTimeEventForUser = formatTime(startTimeEvent);
  const endTimeEventForUser = formatTime(endTimeEvent);

  const eventDuration = (startTime, endTime) => {

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

  const duration = eventDuration(startTimeEvent, endTimeEvent);

  const offerMarkup = offers
    .map((offer) => {
      return createDayEventOfferTemplate(offer);
    })
    .join(`\n`);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} to ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeISO}">${startTimeEventForUser}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeISO}">${endTimeEventForUser}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
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

const createDayTemplate = (points, dayCount) => {
  const startTime = points[0].startTimeEvent;
  const starTimeDayISO = formatDate(startTime, true);
  const startDay = `${MONTHS[startTime.getMonth()]} ${startTime.getDate()}`;
  const pointsData = [];

  for (const point of points) {
    pointsData.push(createDayPointTemplate(point));
  }

  const pointMarkup = pointsData.join(`\n`);

  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayCount}</span>
      <time class="day__date" datetime="${starTimeDayISO}">${startDay}</time>
    </div>

    <ul class="trip-events__list">
      ${pointMarkup}
    </ul>
  </li>`);
};

export {createDayTemplate};
