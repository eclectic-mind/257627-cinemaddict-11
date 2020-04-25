import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from '../constants.js';
import {doSorting} from '../utils/common.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';

import LoadMoreButtonComponent from '../components/button.js';
import FilmsContainerComponent from '../components/films.js';
import SortingComponent from '../components/sort.js';
import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details.js';
import SpecialFilmsComponent from '../components/special.js';
import NoFilmsComponent from '../components/no-films.js';

const renderFilm = (container, movie) => {

  /* const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      popup.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  */

  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const picture = card.getElement().querySelector(`.film-card__poster`);
  const title = card.getElement().querySelector(`.film-card__title`);
  const comments = card.getElement().querySelector(`.film-card__comments`);
  const closeButton = popup.getElement().querySelector(`.film-details__close-btn`);

  /*
  picture.showPopup(() => {
    render(pageMain, popup.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

   title.showPopup(() => {
    render(pageMain, popup.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  comments.showPopup(() => {
    render(pageMain, popup.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  closeButton.closePopup((evt) => {
    evt.preventDefault();
    popup.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, card, RenderPosition.BEFOREEND);
  */
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

const renderFilms = (filmsListContainer, items) => {
  items.forEach((item) => {
    renderFilm(filmsListContainer, item);
  });
};


export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._card = new CardComponent();
    this._details = new DetailsComponent();
    this._top = new SpecialFilmsComponent(SUBTITLES[0]);
    this._most = new SpecialFilmsComponent(SUBTITLES[1]);
  }

  render(movies) {

    const renderButton = () => {
      /* if (moviesSorted.length >= CARDS_QUANTITY_ON_START) {
        return;
      } */

      render(container, this._button, RenderPosition.BEFOREEND);

      this._button.setClickHandler(() => {
        const prevMoviesCount = showingMoviesCount;
        showingMoviesCount += CARDS_QUANTITY_MORE;

        const moviesSorted = doSorting(movies, `date`, prevMoviesCount, showingMoviesCount);
        moviesSorted.slice(prevMoviesCount, showingMoviesCount).forEach(item => renderFilm(films, item));

        if (showingMoviesCount >= moviesSorted.length) {
          remove(this._buttonComponent);
        }

      });
    };

    const container = this._container.getElement();

    if (movies.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    // render(container, this._sort, RenderPosition.BEFOREEND);
    render(container, this._films, RenderPosition.BEFOREEND);

    // const taskListElement = this._tasksComponent.getElement();

    // let showingTasksCount = TASKS_COUNT_ON_START;
    renderFilms(this._films, movies.slice(0, CARDS_QUANTITY_ON_START));

    renderButton();

    /*this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = TASKS_COUNT_BY_BUTTON;
      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);

      renderButton();
    });
    */
  }
}

/*
renderS(pageMain, board.getElement(), RenderPositionS.BEFOREEND);

const filmsList = board.getElement().querySelector(`.films-list`);

renderS(board.getElement(), filmsList, RenderPositionS.BEFOREEND);
renderS(filmsList, films.getElement(), RenderPositionS.AFTERBEGIN);

renderS(board.getElement(), top.getElement(), RenderPositionS.BEFOREEND);
renderS(board.getElement(), most.getElement(), RenderPositionS.BEFOREEND);

let showingMoviesCount = CARDS_QUANTITY_ON_START;
moviesSorted.slice(0, showingMoviesCount).forEach(item => renderFilm(films.getElement(), item));

if (moviesSorted.length > CARDS_QUANTITY_ON_START) {
  renderS(filmsList, button.getElement(), RenderPositionS.BEFOREEND);
}

if (button.getElement()) {
    button.getElement().addEventListener(`click`, () => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount += CARDS_QUANTITY_MORE;
      moviesSorted.slice(prevMoviesCount, showingMoviesCount).forEach(item => renderFilm(films.getElement(), item));

      if (showingMoviesCount >= moviesSorted.length) {
        button.getElement().remove();
        button.removeElement();
      }
  });
};

const topContainer = top.getElement().querySelector(`.films-list__container`);
moviesTopRated.forEach(item => renderFilm(topContainer, item));

const mostContainer = most.getElement().querySelector(`.films-list__container`);
moviesMostComment.forEach(item => renderFilm(mostContainer, item));
*/
