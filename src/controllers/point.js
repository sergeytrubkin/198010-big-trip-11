import PointComponent from '../components/point.js';
import PointEditComponent from '../components/point-edit.js';
import {render, replace} from '../utils/render.js';

export default class PointController {
  constructor(container) {
    this._container = container;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  // отрисовка одного события
  render(point) {

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._replaceEditToPoint();
    });

    render(this._container, this._pointComponent);
  }

  // функция замены точки маршрута с режима просмотра в режим редактирования и обратно
  _replacePointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._pointComponent, this._pointEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
