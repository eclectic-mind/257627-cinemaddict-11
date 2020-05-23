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
  const short = name.toLowerCase().split(` `).join(`-`);
  const active = currentStatsFilterType === name ? `checked` : ``;
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${short}" value="${short}" ${active}>
    <label for="statistic-${short}" class="statistic__filters-label">${name}</label>`
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
  const genresWatched = getUniqueGenres(moviesFiltered);
  const quantities = countWatchedByGenres(moviesFiltered);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresWatched,
      datasets: [{
        data: quantities,
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

  constructor(movies) {
    super();
    this._movies = movies;
    // this._statsFilters = statsFilters;
    this._currentStatsFilterType = StatsFilterType.ALL;
    this._filmsChart = null;
    // this._onDataChange = this._onDataChange.bind(this);
    this._period = StatsFilterType.ALL;
    this._moviesFiltered = filterByWatchingDate(this._movies, this._period);
    this._renderCharts(this._moviesFiltered, this._period);
  }

  getTemplate() {
    return makeFullStatsMarkup(this._movies, this._currentStatsFilterType, this._period);
  }

  _renderCharts(movies, period) {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);
    this._filmsChart = createCharts(movies, filmsCtx, period);
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

  /* _onDataChange() {
    this.render();
  } */
}
