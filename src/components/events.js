import {createElement} from '../utils.js';

const createEventsTemplate = () =>
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`;

export default class Events {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsTemplate();
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
