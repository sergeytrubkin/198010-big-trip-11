import AbstractComponent from '../components/abstract-component.js';

const createNoEventTemplate = () =>
  `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return createNoEventTemplate();
  }
}
