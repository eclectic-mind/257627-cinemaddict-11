import {AVATAR_SIZE, STATS_SORT_BY, STATS_TITLES, StatsSortType} from '../constants.js';
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getWatched, getTotalDuration, getTopGenre, calculateRank, filterByWatchingDate, getWatchedGenres, countWatchedByGenres} from "../utils/common.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const makeRankBlock = (movies) => {
  const quantity = getWatched(movies).length;
  const rank = calculateRank(quantity);
  if (quantity < 1) {
    return ` `;
  }
  else {
    return (
      `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
      <span class="statistic__rank-label">${rank}</span>
      </p>`
    );
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

const makeStatsSortLink = (name, currentStatsSortType) => {
  const active = currentStatsSortType === name ? `checked` : ``;
  /* return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name}" value="${name}" ${currentStatsSortType === name ? ${active} : ``}>
    <label for="statistic-${name}" class="statistic__filters-label">${name}</label>`
  ); */
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name}" value="${name}" ${active}}>
    <label for="statistic-${name}" class="statistic__filters-label">${name}</label>`
  );
};

const makeStatsSorting = (currentStatsSortType) => {
  const names = STATS_SORT_BY;
  const links = names.map((item) => makeStatsSortLink(item, currentStatsSortType)).join(``);
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${links}
    </form>`
  );
}

const makeChartsBlock = () => {
  return (
    `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000">
      </canvas>
    </div>`
  );
};


const createCharts = (movies, statisticCtx) => {
  const BAR_HEIGHT = 50;
  // const statisticCtx = document.querySelector(`.statistic__chart`);
  // console.log(statisticCtx);
  statisticCtx.height = BAR_HEIGHT * 5;

  const genresWatched = getWatchedGenres(movies);
  const quantities = countWatchedByGenres(movies);

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

  console.log(myChart(movies));
};

/* const renderCharts = (movies) => {
  const content = makeCharts(movies);
  console.log(content);
};
*/

const makeFullStatsMarkup = (movies, currentStatsSortType) => {
  const rank = makeRankBlock(movies);
  const sort = makeStatsSorting(currentStatsSortType);
  const stats = makeStatsBlock(movies);
  const charts = makeChartsBlock();
  return (
    `<section class="statistic">
    ${rank}
    ${sort}
    ${stats}
    ${charts}
    </section>`
  );
};

export default class Charts extends AbstractSmartComponent {

  constructor(movies, currentStatsSortType) {
    super();
    this._movies = movies;
    this._currentStatsSortType = StatsSortType.ALL;
    this._filmsChart = null;
    this._renderCharts(this._movies);
  }

  getTemplate() {
    return makeFullStatsMarkup(this._movies, this._currentStatsSortType);
  }

  _renderCharts(movies) {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);
    this._filmsChart = createCharts(movies, filmsCtx);
  }

  show() {
    super.show();
    this.rerender();
  }

  getSortType() {
    return this._currentStatsSortType;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setstatsSortTypeChangeHandler(this._statsSortTypeChangeHandler);
  }

  setStatsSortTypeChangeHandler(handler) {

    this.getElement().addEventListener(`input`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.value;
      if (this._currentStatsSortType === sortType) {
        return;
      }

      this._currentStatsSortType = sortType;
      handler(this._currentStatsSortType);
      this.rerender();
    });
    this._statsSortTypeChangeHandler = handler;
  }
}

/*
const colorToHex = {
  black: `#000000`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
  yellow: `#ffe125`,
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getTasksByDateRange = (tasks, startDate, endDate) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    return dueDate >= startDate && dueDate <= endDate;
  });
};

const createPlaceholder = (startDate, endDate) => {
  const format = (date) => {
    return moment(date).format(`DD MMM`);
  };

  return `${format(startDate)} - ${format(endDate)}`;
};

const calcUniqCountColor = (tasks, color) => {
  return tasks.filter((it) => it.color === color).length;
};

const calculateBetweenDates = (from, to) => {
  const result = [];
  let date = new Date(from);

  while (date <= to) {
    result.push(date);

    date = new Date(date);
    date.setDate(date.getDate() + 1);
  }

  return result;
};

const renderColorsChart = (colorsCtx, tasks) => {
  const colors = tasks
    .map((task) => task.color)
    .filter(getUniqItems);

  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colors,
      datasets: [{
        data: colors.map((color) => calcUniqCountColor(tasks, color)),
        backgroundColor: colors.map((color) => colorToHex[color])
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

const renderDaysChart = (daysCtx, tasks, startDate, endDate) => {
  const days = calculateBetweenDates(startDate, endDate);

  const taskCountOnDay = days.map((date) => {
    return tasks.filter((task) => {
      return isSameDay(task.dueDate, date);
    }).length;
  });

  const formattedDates = days.map((it) => moment(it).format(`DD MMM`));

  return new Chart(daysCtx, {
    plugins: [ChartDataLabels],
    type: `line`,
    data: {
      labels: formattedDates,
      datasets: [{
        data: taskCountOnDay,
        backgroundColor: `transparent`,
        borderColor: `#000000`,
        borderWidth: 1,
        lineTension: 0,
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBackgroundColor: `#000000`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 8
          },
          color: `#ffffff`
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `#000000`
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const makeStatisticsTemplate = ({movies, startDate, endDate}) => {
  const placeholder = createPlaceholder(startDate, endDate);
  const tasksCount = getTasksByDateRange(tasks, startDate, endDate).length;
  return (
    `<section class="statistic container">
      <div class="statistic__line">
        <div class="statistic__period">
          <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>
          <div class="statistic-input-wrap">
            <input class="statistic__period-input" type="text" placeholder="${placeholder}">
          </div>
          <p class="statistic__period-result">
            In total for the specified period
            <span class="statistic__task-found">${tasksCount}</span> tasks were fulfilled.
          </p>
        </div>
        <div class="statistic__line-graphic">
          <canvas class="statistic__days" width="550" height="150"></canvas>
        </div>
      </div>
      <div class="statistic__circle">
        <div class="statistic__colors-wrap">
          <canvas class="statistic__colors" width="400" height="300"></canvas>
        </div>
      </div>
    </section>`
  );
};

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
