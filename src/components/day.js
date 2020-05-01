import {MONTHS} from '../const.js';
import {formatDate, createElement} from '../utils.js';

const createDayTemplate = (points, dayCount) => {
  const startTime = points[0].startTimeEvent;
  const starTimeDayISO = formatDate(startTime, true);
  const startDay = `${MONTHS[startTime.getMonth()]} ${startTime.getDate()}`;

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayCount}</span>
      <time class="day__date" datetime="${starTimeDayISO}">${startDay}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`);
};

export default class Day {
  constructor(points, dayCount) {
    this._points = points;
    this._dayCount = dayCount;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._points, this._dayCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
