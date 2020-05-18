import moment from "moment";

// определение рандомного числа из диапазона чисел
const getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// получение значения из рандомного елемента массива
const getRandomElement = function (array) {
  return array[getRandomBetween(0, array.length - 1)];
};

// получение массива случайной длинны из случайных елементов исходного массива
const getRandomNumberElements = function (items) {
  const copyElements = items.slice(0, items.length);
  const numberElements = getRandomBetween(1, copyElements.length);
  const finalElements = [];

  for (let i = 0; i < numberElements; i++) {
    const randomIndex = getRandomBetween(0, copyElements.length - 1);
    finalElements.push(copyElements.splice(randomIndex, 1)[0]);
  }
  return finalElements;
};

// получение случайного числа которое кратно num
const getRandomMultipleNumber = (min, max, num) => {
  return Math.floor(Math.floor(Math.random() * (max - min - 1) + min) / num) * num;
};

const castTimeFormat = (value) => {
  return value.toString().padStart(2, 0);
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const durationTime = (dateStart, dateEnd) => {
  const duration = moment.duration(dateEnd - dateStart);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    `${days ? `${castTimeFormat(days)}D` : ``}
    ${hours ? `${castTimeFormat(hours)}H` : ``}
    ${minutes ? `${castTimeFormat(minutes)}M` : ``}
    `);
};

// форматирование даты в формат 'dd/mm/yy hh:mm' либо ISO 'yyyy-mm-ddThh:mm' - второй параметр true
const formatDate = (date, ISO = false) => {
  return ISO ? moment(date).format(`YYYY-MM-DDTHH:mm`) : moment(date).format(`DD/MM/YY HH:mm`);
};

export {
  getRandomBetween,
  getRandomElement,
  getRandomNumberElements,
  getRandomMultipleNumber,
  castTimeFormat,
  formatTime,
  durationTime,
  formatDate,
};
