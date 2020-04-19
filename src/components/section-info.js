// описание маршрута
const createTripInfoTemplate = (info, start, end) => {
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${info}</h1>

    <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
  </div>`);
};

// стоимость
const createTripInfoCostTemplate = (cost) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};

// создание секции для описания маршрута и его стоимости
export const createSectionInfoTemplate = () => {
  const totalCost = `1230`;
  const pointNameInfo = `Amsterdam &mdash; Chamonix &mdash; Geneva`;
  const startDay = `Mar 18`;
  const endDay = `20`;

  const tripInfoMarkup = createTripInfoTemplate(pointNameInfo, startDay, endDay);
  const tripCostMarkup = createTripInfoCostTemplate(totalCost);

  return (`
    <section class="trip-main__trip-info  trip-info">
      ${tripInfoMarkup}
      ${tripCostMarkup}
    </section>`
  );
};
