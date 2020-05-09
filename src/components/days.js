import AbstractComponent from '../components/abstract-component.js';

// создание нового дня маршрута
const createTripDaysTemplate = () =>
  `<ul class="trip-days"></ul>`;

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
