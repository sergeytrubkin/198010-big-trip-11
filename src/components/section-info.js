// описание маршрута
const createTripInfoTemplate = () => {
  const pointNameInfo = `Amsterdam &mdash; Chamonix &mdash; Geneva`;
  const startDay = `Mar 18`;
  const endDay = `20`;

  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${pointNameInfo}</h1>

    <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${endDay}</p>
  </div>`);
};

// стоимость
const createTripInfoCostTemplate = () => {
  const totalCost = `1230`;
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};

// создание секции для описания маршрута и его стоимости
export const createSectionInfoTemplate = () => {
  const tripInfoMarkup = createTripInfoTemplate();
  const tripCostMarkup = createTripInfoCostTemplate();
  return (`
    <section class="trip-main__trip-info  trip-info">
      ${tripInfoMarkup}
      ${tripCostMarkup}
    </section>`
  );
};
