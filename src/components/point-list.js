import AbstractComponent from "./abstract-component";

const createPointListTemplate = () => {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
};

export default class PointList extends AbstractComponent {
  getTemplate() {
    return createPointListTemplate();
  }
}
