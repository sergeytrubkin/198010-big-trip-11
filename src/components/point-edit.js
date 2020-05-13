import AbstractComponent from './abstract-component.js';
import {TYPES_POINT_TRANSFER, TYPES_POINT_ACTIVITY, DESTINATION_POINTS} from '../const.js';
import {formatTime, formatDate} from '../utils/common.js';

const createTypePointTemplate = (type, index) => {
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
const createEventEditTemplate = (event) => {
  const {id, pointType, destination, startTimePoint, endTimePoint, pointPrice, offers, description, photo} = event;

  const nowDate = new Date();
  const startTimeDefined = startTimePoint ? startTimePoint : nowDate;
  const endTimeDefined = endTimePoint ? endTimePoint : nowDate;

  const typePoint = pointType ? pointType : TYPES_POINT_TRANSFER[0];
  const destinationEvent = destination ? destination : ``;
  const startTime = `${formatDate(startTimeDefined)} ${formatTime(startTimeDefined)}`;
  const endTime = `${formatDate(endTimeDefined)} ${formatTime(endTimeDefined)}`;
  const price = pointPrice ? pointPrice : ``;
  const descriptionMarkup = description || photo ? createDescriptionTemplate(description, photo) : ``;
  const offersMarkup = offers ? createOffersTemplate(offers) : ``;

  const typesPointTransferMarkup = TYPES_POINT_TRANSFER
    .map((it) => {
      return createTypePointTemplate(it, id);
    })
    .join(`\n`);

  const typesPointActivityMarkup = TYPES_POINT_ACTIVITY
    .map((it) => {
      return createTypePointTemplate(it, id);
    })
    .join(`\n`);

  const destinationsMarkup = DESTINATION_POINTS
    .map((it) => {
      return createDestinationItemTemplate(it);
    })
    .join(`\n`);


  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typePoint}.png"
                alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${typesPointTransferMarkup}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${typesPointActivityMarkup}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${typePoint} to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text"
              name="event-destination" value="${destinationEvent}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinationsMarkup}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time"
              value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time"
              value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price"
              value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-${id}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>

        </header>
        ${offersMarkup}
        ${descriptionMarkup}
      </form>
    </li>`);
};

export default class PointEdit extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
