import AbstractComponent from '../components/abstract-component.js';
import {MONTHS} from '../const.js';
import {formatDate} from '../utils.js';

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

export default class Day extends AbstractComponent {
  constructor(points, dayCount) {
    super();

    this._points = points;
    this._dayCount = dayCount;
  }

  getTemplate() {
    return createDayTemplate(this._points, this._dayCount);
  }
}
