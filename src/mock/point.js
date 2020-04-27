import {TYPES_EVENT_TRANSFER, TYPES_EVENT_ACTIVITY, DESTINATION_POINTS} from '../const.js';
import {getRandomBetween, getRandomElement, getRandomMultipleNumber} from '../utils.js';

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
];

const LINKS_PHOTO = [
  `img/photos/1.jpg`,
  `img/photos/2.jpg`,
  `img/photos/3.jpg`,
  `img/photos/4.jpg`,
  `img/photos/5.jpg`,
];

const offersPoint = [
  {
    type: `luggage`,
    title: `Add luggage`,
    cost: getRandomMultipleNumber(5, 50, 5),
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    cost: getRandomMultipleNumber(5, 50, 5),
  },
  {
    type: `meal`,
    title: `Add meal`,
    cost: getRandomMultipleNumber(5, 50, 5),
  },
  {
    type: `seats`,
    title: `Choose seats`,
    cost: getRandomMultipleNumber(5, 50, 5),
  },
  {
    type: `train`,
    title: `Travel by train`,
    cost: getRandomMultipleNumber(5, 50, 5),
  }
];

const ALL_TYPES_EVENTS = TYPES_EVENT_ACTIVITY.concat(TYPES_EVENT_TRANSFER);
const MIN_PRICE = 20;
const MAX_PRICE = 400;
const MULTIPLE = 10;

// получение массива случайной длинны из исходного массива
const getRandomArrayLength = (minCount, array) => {
  const randomNumber = getRandomBetween(minCount, array.length);
  return array.slice(0, randomNumber);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomMultipleNumber(5, 2000, 5);

  targetDate.setMinutes(targetDate.getMinutes() + diffValue);

  return targetDate;
};

const generatePoint = () => {
  return {
    eventType: getRandomElement(ALL_TYPES_EVENTS),
    destination: getRandomElement(DESTINATION_POINTS),
    startTimeEvent: new Date(),
    endTimeEvent: getRandomDate(),
    eventPrice: getRandomMultipleNumber(MIN_PRICE, MAX_PRICE, MULTIPLE),
    offers: getRandomArrayLength(0, offersPoint),
    description: getRandomArrayLength(1, DESCRIPTIONS),
    photo: getRandomArrayLength(1, LINKS_PHOTO),
  };
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export {generatePoints};
