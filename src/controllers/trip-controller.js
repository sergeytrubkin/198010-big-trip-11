import TripSortComponent from '../components/sort.js';
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
const renderDay = (tripDayList, eventsOnDay, day) => {
  const dayComponent = new DayComponent(eventsOnDay, day);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);

  eventsOnDay.forEach((event, index) => {
    renderEvent(eventList, event, index + day.toString());
  });

  render(tripDayList, dayComponent);
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  // отрисовка всех событий
  renderTrips(allEvents) {
    const eventSectionComponent = new EventsComponent();
    const daysComponent = new DaysComponent();

    if (Object.keys(allEvents).length === 0) {
      render(eventSectionComponent.getElement(), new NoEventsComponent());
      return;
    }

    render(eventSectionComponent.getElement(), new TripSortComponent());
    render(eventSectionComponent.getElement(), daysComponent);

    const eventsOnDay = allEvents; // нужно дописать выборку событий из общего списка событий allEvents
    for (let i = 0; i < DAY_COUNT; i++) {
      renderDay(daysComponent.getElement(), eventsOnDay, i + 1);
    }

    const daysContainer = this._container;

    render(daysContainer, eventSectionComponent);
  }
}
