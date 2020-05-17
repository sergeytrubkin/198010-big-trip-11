import PointController from '../controllers/point.js';
import TripSortComponent, {SortType} from '../components/sort.js';
import DaysComponent from '../components/days.js';
import PointsComponent from '../components/points.js';
import DayComponent from '../components/day.js';
import NoPointsComponent from '../components/no-points.js';
import {render} from '../utils/render.js';
import PointList from '../components/point-list.js';

const DAY_COUNT = 7;

// отрисовка одного дня
const renderDay = (tripDayList, pointsOnDay, onDataChange, onViewChange, day = 0) => {
  const dayComponent = new DayComponent(pointsOnDay, day);
  const pointsList = new PointList();
  render(tripDayList, dayComponent);
  render(dayComponent.getElement(), pointsList);

  return pointsOnDay.map((point) => {
    const pointController = new PointController(pointsList.getElement(), onDataChange, onViewChange);

    pointController.render(point);

    return pointController;
  });
};

const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();
  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = showingPoints;
      break;
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => {
        const firstDate = new Date(a.endTimePoint - a.startTimePoint);
        const secondDate = new Date(b.endTimePoint - b.startTimePoint);

        return secondDate - firstDate;
      });
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.pointPrice - a.pointPrice);
      break;
  }

  return sortedPoints;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._points = [];
    this._showedPointControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSortComponent = new TripSortComponent(SortType.point);
  }

  // отрисовка всех событий
  renderTrips(points) {
    this._points = points;

    const pointSectionComponent = new PointsComponent();
    const daysComponent = new DaysComponent();
    const daysContainer = daysComponent.getElement();

    if (Object.keys(points).length === 0) {
      render(pointSectionComponent.getElement(), new NoPointsComponent());
      return;
    }

    render(pointSectionComponent.getElement(), this._tripSortComponent);
    render(pointSectionComponent.getElement(), daysComponent);

    const pointsOnDay = points; // нужно дописать выборку событий из общего списка событий trips
    let numberDay = 1;
    while (numberDay <= DAY_COUNT) {
      const newPoints = renderDay(daysContainer, pointsOnDay, this._onDataChange, this._onViewChange, numberDay);
      this._showedPointControllers = this._showedPointControllers.concat(newPoints);
      numberDay++;
    }

    // for (let i = 0; i < DAY_COUNT; i++) {
    //   renderDay(daysContainer, pointsOnDay, this._onDataChange, i + 1);
    // }

    const mainContainer = this._container;

    render(mainContainer, pointSectionComponent);

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedTrips = getSortedPoints(points, sortType);
      const sortDay = this._tripSortComponent.getElement().querySelector(`.trip-sort__item--day`);

      daysContainer.innerHTML = ``;
      if (sortType === SortType.EVENT) {
        sortDay.innerHTML = `Day`;
        for (let i = 0; i < DAY_COUNT; i++) {
          renderDay(daysContainer, sortedTrips, this._onDataChange, this._onViewChange, i + 1);
        }
      } else {
        sortDay.innerHTML = ``;
        renderDay(daysContainer, sortedTrips, this._onDataChange, this._onViewChange);
      }
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((point) => point === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((id) => {
      id.setDefaultView();
    });
  }
}
