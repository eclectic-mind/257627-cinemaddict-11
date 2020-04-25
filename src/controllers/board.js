import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from './constants.js';
import {doSorting} from './utils/common.js';
import {render, remove, replace, RenderPosition} from "./utils/render.js";

import LoadMoreButtonComponent from './components/button.js';
import StatsComponent from './components/stats.js';
import RankComponent from './components/rank.js';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import FilmsContainerComponent from './components/films.js';
import SortingComponent from './components/sort.js';
import CardComponent from './components/card.js';
import DetailsComponent from './components/details.js';
import SpecialFilmsComponent from './components/special.js';
import NoFilmsComponent from './components/no-films.js';

const renderFilm = (container, movie) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      popup.remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const picture = card.querySelector(`.film-card__poster`);
  const title = card.querySelector(`.film-card__title`);
  const comments = card.querySelector(`.film-card__comments`);
  const closeButton = popup.querySelector(`.film-details__close-btn`);

  picture.showPopup(() => {
    render(pageMain, popup, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  title.showPopup(() => {
    render(pageMain, popup, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  comments.showPopup(() => {
    render(pageMain, popup, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  closeButton.closePopup((evt) => {
    evt.preventDefault();
    popup.remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, card.getElement(), RenderPosition.BEFOREEND);
};

/*
const renderFilm = (container, movie) => {
  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const closePopup = () => {
    pageMain.removeChild(popup.getElement());
  };
  const showPopup = (movie) => {
    render(pageMain, popup.getElement(), RenderPosition.BEFOREEND);
  };

  const picture = card.getElement().querySelector(`.film-card__poster`);
  picture.addEventListener(`click`, showPopup);

  const title = card.getElement().querySelector(`.film-card__title`);
  title.addEventListener(`click`, showPopup);

  const comments = card.getElement().querySelector(`.film-card__comments`);
  comments.addEventListener(`click`, showPopup);

  const closeButton = popup.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, closePopup);

  render(container, card.getElement(), RenderPosition.BEFOREEND);
};
*/

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._buttonComponent = new ButtonComponent();
  }

  render(tasks) {
    const renderButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._buttonComponent, RenderPosition.BEFOREEND);

      this._buttonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._buttonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = TASKS_COUNT_ON_START;
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));

    renderButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = TASKS_COUNT_BY_BUTTON;
      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);

      renderButton();
    });
  }
}
