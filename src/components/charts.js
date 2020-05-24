import {AVATAR_SIZE, STATS_FILTER_BY, STATS_TITLES, StatsFilterType, HIDDEN_CLASS /*, Mode*/} from '../constants.js';
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getWatched, getTotalDuration, getTopGenre, calculateRank, filterByWatchingDate, getWatchedGenres, getUniqueGenres, countWatchedByGenres, makeMenuLink /*, modeSwitcher */} from "../utils/common.js";

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

export const makeStatsFilterLink = (name, period) => {
  const short = name.toLowerCase().split(` `).join(`-`);
  const active = period === name ? `checked` : ``;
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${short}" value="${short}" ${active}>
    <label for="statistic-${short}" class="statistic__filters-label">${name}</label>`
  );
};

export const makeStatsFilters = (period) => {
  const names = STATS_FILTER_BY;
  const links = names.map((item) => makeStatsFilterLink(item, period)).join(`\n`);
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

const makeFullStatsMarkup = (movies, period /*, mode */) => {
  const moviesFiltered = filterByWatchingDate(movies, period);
  console.log(movies, moviesFiltered, period);
  const rank = makeRankBlock(moviesFiltered);
  const filters = makeStatsFilters(period);
  const stats = makeStatsBlock(moviesFiltered);
  const charts = makeChartsBlock();
  /* const additionalClass = mode === `board` ? HIDDEN_CLASS : ``; */
  return (
    `<section class="statistic ${HIDDEN_CLASS}">
    ${rank}
    ${filters}
    ${stats}
    ${charts}
    </section>`
  );
};

export default class Charts extends AbstractSmartComponent {

  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;
    this._movies = this._moviesModel.getMoviesAll();

    // this._statsFilters = statsFilters;
    this._currentStatsFilterType = StatsFilterType.ALL;
    this._filmsChart = null;
    // this._onDataChange = this._onDataChange.bind(this);
    // this._period = this._currentStatsFilterType;
    this._moviesFiltered = filterByWatchingDate(this._movies, this._currentStatsFilterType);
    this._renderCharts(this._moviesFiltered, this._currentStatsFilterType);
    // this.render(this._moviesFiltered, this._period);
    // this._onStatsFilterChange = this._onStatsFilterChange.bind(this);
    // this.setStatsFilterTypeChangeHandler(this._statsFilterTypeChangeHandler);
    this.setStatsFilterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return makeFullStatsMarkup(this._movies, this._currentStatsFilterType);
  }

  /*render(movies, period) {
    this._renderCharts(this._moviesFiltered, this._period);
    const filtersBlock = document.querySelector(`.statistic__filters`);
    console.log(filtersBlock);
    filtersBlock.addEventListener(`click`, (evt) => {
      console.log(`где-то кликнули по фильтрам`);
    });
  }*/

  _renderCharts(movies, period) {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);
    this._filmsChart = createCharts(movies, filmsCtx, period);
  }

  show() {
    super.show();
    this.rerender();
  }

  hide() {
    super.hide();
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
    this._statsFilterTypeChangeHandler = handler;

    this.getElement().querySelector(`.statistic__filters`).addEventListener(`input`, (evt) => {

      evt.preventDefault();
      // console.log(evt.target.tagName);

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const filterType = evt.target.value;
      console.log(filterType);

      if (this._currentStatsFilterType === filterType) {
        return;
      }

      this._currentStatsFilterType = filterType;
      handler(this._currentStatsFilterType);
      this.rerender();

      // console.log(this._currentStatsFilterType);
    });

  }

  /* _onStatsFilterChange(statsFilterType) {
    this._currentStatsFilterType = statsFilterType;
  } */

}
