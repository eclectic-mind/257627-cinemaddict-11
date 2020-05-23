import {AVATAR_SIZE, STATS_FILTER_BY, STATS_TITLES, StatsFilterType} from '../constants.js';
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getWatched, getTotalDuration, getTopGenre, calculateRank, filterByWatchingDate, getWatchedGenres, getUniqueGenres, countWatchedByGenres, makeMenuLink} from "../utils/common.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const makeRankBlock = (movies) => {
  const quantity = getWatched(movies).length;
  if (quantity > 0) {
  const rank = calculateRank(quantity);
  // if (quantity < 1) {
  //   return ` `;
  // }
    return (
      `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
      <span class="statistic__rank-label">${rank}</span>
      </p>`
    );
  } else {
    return ``;
  }
};

const makeStatsBlock = (movies) => {
  const watched = getWatched(movies).length;
  const total = getTotalDuration(movies);
  const top = getTopGenre(movies);

  return (
    `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${STATS_TITLES[0]}</h4>
        <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${STATS_TITLES[1]}</h4>
        <p class="statistic__item-text">${total}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${STATS_TITLES[2]}</h4>
        <p class="statistic__item-text">${top}</p>
      </li>
    </ul>`
  );
};

export const makeStatsFilterLink = (name, currentStatsFilterType) => {
  // const {name, checked} = filter;
  const active = currentStatsFilterType === name ? `checked` : ``;
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name}" value="${name}" ${active}}>
    <label for="statistic-${name}" class="statistic__filters-label">${name}</label>`
  );
};

export const makeStatsFilters = (currentStatsFilterType) => {
  const names = STATS_FILTER_BY;
  const links = names.map((item) => makeStatsFilterLink(item, currentStatsFilterType)).join(`\n`);
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${links}
    </form>`
  );
};

const makeChartsBlock = () => {
  return (
    `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000">
      </canvas>
    </div>`
  );
};

const createCharts = (movies, statisticCtx, period) => {
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;

  const moviesFiltered = filterByWatchingDate(movies, period);
  // console.log(movies, moviesFiltered);

  const genresWatched = getUniqueGenres(moviesFiltered);
  const quantities = countWatchedByGenres(moviesFiltered);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresWatched,
      // labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: quantities,
        // data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
            },
          color: `#ffffff`,
          anchor: 'start',
          align: 'start',
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
            barThickness: 24
          }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
            gridLines: {
              display: false,
              drawBorder: false
            },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const makeFullStatsMarkup = (movies, currentStatsFilterType, period) => {
  // const period = `week`;

  const moviesFiltered = filterByWatchingDate(movies, period);
  console.log(movies, moviesFiltered, currentStatsFilterType, period);

  const rank = makeRankBlock(moviesFiltered);
  const filters = makeStatsFilters(currentStatsFilterType);
  const stats = makeStatsBlock(moviesFiltered);
  const charts = makeChartsBlock();
  return (
    `<section class="statistic">
    ${rank}
    ${filters}
    ${stats}
    ${charts}
    </section>`
  );
};

export default class Charts extends AbstractSmartComponent {

  constructor(movies, period) {
    super();
    this._movies = movies;
    // this._statsFilters = statsFilters;
    this._currentStatsFilterType = StatsFilterType.ALL;
    this._filmsChart = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._period = period;
    this._moviesFiltered = filterByWatchingDate(this._movies, this._period);
    this._renderCharts(this._moviesFiltered);
  }

  getTemplate() {
    return makeFullStatsMarkup(this._movies, this._currentStatsFilterType, this._period);
  }

  _renderCharts(movies) {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);

    this._filmsChart = createCharts(movies, filmsCtx, this._period);
  }

  show() {
    super.show();
    this.rerender();
  }

  getFilterType() {
    return this._currentStatsFilterType;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setStatsFilterTypeChangeHandler(this._statsFilterTypeChangeHandler);
  }

  setStatsFilterTypeChangeHandler(handler) {

    this.getElement().addEventListener(`.statistic__filters`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `input`) {
        return;
      }

      const filterType = evt.target.value;

      if (this._currentStatsFilterType === filterType) {
        return;
      }

      this._currentStatsFilterType = filterType;
      handler(this._currentStatsFilterType);
      this.rerender();

      console.log(this._currentStatsFilterType);
    });
    this._statsFilterTypeChangeHandler = handler;
  }

  _onDataChange() {
    this.render();
  }
}

/*
export default class Statistics extends AbstractSmartComponent {
  constructor({tasks, startDate, endDate}) {
    super();

    this._tasks = tasks;
    this._startDate = startDate;
    this._endDate = endDate;

    this._daysChart = null;
    this._colorsChart = null;

    this._applyFlatpickr(this.getElement().querySelector(`.statistic__period-input`));

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate({tasks: this._tasks.getTasks(), startDate: this._startDate, endDate: this._endDate});
  }

  show() {
    super.show();

    this.rerender(this._tasks, this._startDate, this._endDate);
  }

  recoveryListeners() {}

  rerender(tasks, startDate, endDate) {
    this._tasks = tasks;
    this._startDate = startDate;
    this._endDate = endDate;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    this._applyFlatpickr(this.getElement().querySelector(`.statistic__period-input`));

    const daysCtx = element.querySelector(`.statistic__days`);
    const colorsCtx = element.querySelector(`.statistic__colors`);

    this._resetCharts();

    this._daysChart = renderDaysChart(daysCtx, this._tasks.getTasks(), this._startDate, this._endDate);
    this._colorsChart = renderColorsChart(colorsCtx, this._tasks.getTasks());
  }

  _resetCharts() {
    if (this._daysChart) {
      this._daysChart.destroy();
      this._daysChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }

}
*/
