const createDayEventOfferTemplate = () => {
  const offerTitle = `Order Uber`;
  const offerCost = `20`;

  return (`
    <li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerCost}</span>
    </li>`);
};


const createDayPointTemplate = () => {
  const eventType = `taxi`;
  const startTimeEvent = `2019-03-18T10:30`;
  const startTimeEventForUser = `10:30`;
  const endTimeEvent = `2019-03-18T11:00`;
  const endTimeEventForUser = `11:00`;
  const eventDuration = `30M`;
  const eventPrice = `20`;
  const offerMarkup = createDayEventOfferTemplate();

  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} to Amsterdam</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeEvent}">${startTimeEventForUser}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeEvent}">${endTimeEventForUser}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
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

const createDayTemplate = () => {
  const numberDay = 1;
  const date = `MAR 18`;
  const pointMarkup = createDayPointTemplate();

  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${numberDay}</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>

    <ul class="trip-events__list">
      ${pointMarkup}
      ${pointMarkup}
      ${pointMarkup}
    </ul>
  </li>`);
};

export {createDayTemplate};
