import TripSortComponent, {SortType} from '../components/sort.js';
import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import DaysComponent from '../components/days.js';
import EventsComponent from '../components/events.js';
import DayComponent from '../components/day.js';
import NoEventsComponent from '../components/no-events.js';
import {render, replace} from '../utils/render.js';

const DAY_COUNT = 7;

// отрисовка одного события
const renderEvent = (tripEventList, event, indexID) => {

  // функция замены точки маршрута с режима просмотра в режим редактирования и обратно
  const replaceEventToEdit = () => replace(eventEditComponent, eventComponent);
  const replaceEditToEvent = () => replace(eventComponent, eventEditComponent);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event, indexID);

  eventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();

    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventList, eventComponent);
};

// отрисовка одного дня
const renderDay = (tripDayList, eventsOnDay, day = 0) => {
  const dayComponent = new DayComponent(eventsOnDay, day);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);

  eventsOnDay.forEach((event, index) => {
    renderEvent(eventList, event, index + day.toString());
  });

  render(tripDayList, dayComponent);
};

const getSortedTrip = (trips, sortType) => {
  let sortedTrips = [];
  const showingTrips = trips.slice();
  switch (sortType) {
    case SortType.EVENT:
      sortedTrips = showingTrips;
      break;
    case SortType.TIME:
      sortedTrips = showingTrips.sort((a, b) => {
        const firstDate = new Date(a.endTimeEvent - a.startTimeEvent);
        const secondDate = new Date(b.endTimeEvent - b.startTimeEvent);

        return secondDate - firstDate;
      });
      break;
    case SortType.PRICE:
      sortedTrips = showingTrips.sort((a, b) => b.eventPrice - a.eventPrice);
      break;
  }

  return sortedTrips;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripSortComponent = new TripSortComponent(SortType.EVENT);
  }

  // отрисовка всех событий
  renderTrips(allEvents) {
    const eventSectionComponent = new EventsComponent();
    const daysComponent = new DaysComponent();
    const daysContainer = daysComponent.getElement();

    if (Object.keys(allEvents).length === 0) {
      render(eventSectionComponent.getElement(), new NoEventsComponent());
      return;
    }

    render(eventSectionComponent.getElement(), this._tripSortComponent);
    render(eventSectionComponent.getElement(), daysComponent);

    const eventsOnDay = allEvents; // нужно дописать выборку событий из общего списка событий allEvents
    for (let i = 0; i < DAY_COUNT; i++) {
      renderDay(daysContainer, eventsOnDay, i + 1);
    }

    const mainContainer = this._container;

    render(mainContainer, eventSectionComponent);

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedTrips = getSortedTrip(allEvents, sortType);
      const sortDay = this._tripSortComponent.getElement().querySelector(`.trip-sort__item--day`);

      daysContainer.innerHTML = ``;
      if (sortType === SortType.EVENT) {
        sortDay.innerHTML = `Day`;
        for (let i = 0; i < DAY_COUNT; i++) {
          renderDay(daysContainer, sortedTrips, i + 1);
        }
      } else {
        sortDay.innerHTML = ``;
        renderDay(daysContainer, sortedTrips);
      }
    });
  }
}
