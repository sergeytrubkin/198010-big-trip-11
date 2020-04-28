const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `after`,
};

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
  const formattedMinutes = castTimeFormat(date.getMinutes());
  const formattedHours = castTimeFormat(date.getHours());

  return `${formattedHours}:${formattedMinutes}`;
};

// форматирование даты в формат 'dd/mm/yy hh:mm' либо ISO 'yyyy-mm-ddThh:mm' - второй параметр true
const formatDate = (date, ISO = false) => {
  const formattedDay = castTimeFormat(date.getDate());
  const formattedMonth = castTimeFormat(date.getMonth() + 1);
  const formattedYear = date.getFullYear().toString().substring(2);
  const formattedFullYear = date.getFullYear();

  return ISO ? `${formattedFullYear}-${formattedMonth}-${formattedDay}` :
    `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// функция отрисовки компонента
const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {
  RenderPosition,
  getRandomBetween,
  getRandomElement,
  getRandomNumberElements,
  getRandomMultipleNumber,
  castTimeFormat,
  formatTime,
  formatDate,
  createElement,
  render,
};
