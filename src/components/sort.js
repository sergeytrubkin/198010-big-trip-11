import AbstractComponent from './abstract-component.js';

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

// сортировка
const createTripSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.EVENT}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time" data-sort-type="${SortType.TIME}">
        Time
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">
        Price
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;

export default class TripSort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;
  }
  getTemplate() {
    return createTripSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
