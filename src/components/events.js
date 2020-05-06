import AbstractComponent from '../components/abstract-component.js';

const createEventsTemplate = () =>
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`;

export default class Events extends AbstractComponent {
  getTemplate() {
    return createEventsTemplate();
  }
}
