import AbstractComponent from '../components/abstract-component.js';
import {TYPES_EVENT_TRANSFER, TYPES_EVENT_ACTIVITY, DESTINATION_EVENTS} from '../const.js';
import {formatTime, formatDate} from '../utils.js';

const createTypeEventTemplate = (type, index) => {
  const uppercaseType = type[0].toUpperCase() + type.slice(1);

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${uppercaseType}</label>
    </div>`);
};

const createDestinationItemTemplate = (destination) => {
  return (`
  <option value="${destination}"></option>`);
};

// шаблон одного предложения
const createOfferItemTemplate = (offer, index, isChecked) => {
  const {type, title, cost} = offer;
  const inputChecked = isChecked ? `checked` : ``;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox"
        name="event-offer-${type}" ${inputChecked}>
      <label class="event__offer-label" for="event-offer-${type}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
      </label>
    </div>`);
};

// шаблон секции всех предложений в указанной точке маршрута
const createOffersTemplate = (offers) => {
  const offerMarkup = offers
    .map((offer, index) => {
      return createOfferItemTemplate(offer, index);
    })
    .join(`\n`);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offerMarkup}
      </div>
    </section>`);
};

const createPhotoTemplate = (linkPhoto) => {
  return (
    `<img class="event__photo" src="${linkPhoto}" alt="Event photo">`);
};

// описание точки маршрута
export const createDescriptionTemplate = (description, linksPhoto) => {
  const descriptionText = description ? description : ``;

  const photoMarkup = linksPhoto ? linksPhoto
    .map((link) => {
      return createPhotoTemplate(link);
    })
    .join(`\n`) : ``;

  return (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${descriptionText}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photoMarkup}
      </div>
    </div>
  </section>`);
};

// форма создания(редактирования) пути
const createEventEditTemplate = (event, indexId) => {
  const {eventType, destination, startTimeEvent, endTimeEvent, eventPrice, offers, description, photo} = event;

  const nowDate = new Date();
  const startTimeDefined = startTimeEvent ? startTimeEvent : nowDate;
  const endTimeDefined = endTimeEvent ? endTimeEvent : nowDate;

  const typeEvent = eventType ? eventType : TYPES_EVENT_TRANSFER[0];
  const destinationEvent = destination ? destination : ``;
  const startTime = `${formatDate(startTimeDefined)} ${formatTime(startTimeDefined)}`;
  const endTime = `${formatDate(endTimeDefined)} ${formatTime(endTimeDefined)}`;
  const price = eventPrice ? eventPrice : ``;
  const descriptionMarkup = description || photo ? createDescriptionTemplate(description, photo) : ``;
  const offersMarkup = offers ? createOffersTemplate(offers) : ``;

  const typesEventTransferMarkup = TYPES_EVENT_TRANSFER
    .map((it) => {
      return createTypeEventTemplate(it, indexId);
    })
    .join(`\n`);

  const typesEventActivityMarkup = TYPES_EVENT_ACTIVITY
    .map((it) => {
      return createTypeEventTemplate(it, indexId);
    })
    .join(`\n`);

  const destinationsMarkup = DESTINATION_EVENTS
    .map((it) => {
      return createDestinationItemTemplate(it);
    })
    .join(`\n`);


  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${indexId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeEvent}.png"
                alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${indexId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${typesEventTransferMarkup}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${typesEventActivityMarkup}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${indexId}">
              ${typeEvent} to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${indexId}" type="text"
              name="event-destination" value="${destinationEvent}" list="destination-list-${indexId}">
            <datalist id="destination-list-${indexId}">
              ${destinationsMarkup}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${indexId}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${indexId}" type="text" name="event-start-time"
              value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${indexId}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${indexId}" type="text" name="event-end-time"
              value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${indexId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${indexId}" type="text" name="event-price"
              value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        ${offersMarkup}
        ${descriptionMarkup}
      </form>
    </li>`);
};

export default class EventEdit extends AbstractComponent {
  constructor(event, indexId) {
    super();

    this._event = event;
    this._indexId = indexId;
  }

  getTemplate() {
    return createEventEditTemplate(this._event, this._indexId);
  }
}
