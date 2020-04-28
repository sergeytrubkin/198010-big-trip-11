import SectionInfoComponent from './components/section-info.js';
import TripControlMenuComponent from './components/trip-control.js';
import TripMainFilterComponent from './components/filter.js';
import TripSortComponent from './components/sorting.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';
import DaysComponent from './components/days.js';
import EventsComponent from './components/events.js';
import DayComponent from './components/day.js';
import NoEventsComponent from './components/no-events.js';
import {generateEvents} from './mock/event.js';
import {RenderPosition, render} from './utils.js';

const DAY_COUNT = 7;
const EVENT_COUNT = 5;
const events = generateEvents(EVENT_COUNT);

// отрисовка одного события
const renderEvent = (tripEventList, event) => {
  const replaceEventToEdit = () => {
    tripEventList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent(event);
  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEdit();

    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent(event);
  const editForm = eventEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    replaceEditToEvent();

    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventList, eventComponent.getElement());
};

// отрисовка одного дня
const renderDay = (tripDayList, eventsOnDay, day) => {
  const dayComponent = new DayComponent(eventsOnDay, day);
  const eventList = dayComponent.getElement().querySelector(`.trip-events__list`);

  eventsOnDay.forEach((event) => {
    return renderEvent(eventList, event);
  });

  render(tripDayList, dayComponent.getElement());
};

// отрисовка всех событий
const renderDays = (eventSection, allEvents) => {

  if (Object.keys(allEvents).length === 0) {
    render(eventSection.getElement(), new NoEventsComponent().getElement());
    return;
  }

  render(eventSection.getElement(), new TripSortComponent().getElement());
  render(eventSection.getElement(), new DaysComponent().getElement());

  const dayList = eventSection.getElement().querySelector(`.trip-days`);

  const eventsOnDay = allEvents; // нужно дописать выборку событий из общего списка событий allEvents
  for (let i = 0; i < DAY_COUNT; i++) {
    renderDay(dayList, eventsOnDay, i + 1);
  }

  render(eventSection, eventSection.getElement());
};

const siteHeader = document.querySelector(`.trip-main`);
const tripControl = document.querySelector(`.trip-controls`);
const controlMenu = tripControl.querySelector(`h2`);
const pageMainContent = document.querySelector(`.page-main .page-body__container`);
// const tripEvents = pageMainContent.querySelector(`.trip-events`);

// header
render(siteHeader, new SectionInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(controlMenu, new TripControlMenuComponent().getElement(), RenderPosition.AFTEREND);
render(tripControl, new TripMainFilterComponent().getElement());

// main
const eventSection = new EventsComponent();
render(pageMainContent, eventSection.getElement());
renderDays(eventSection, events);
