import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from '../constants.js';
import {doSorting} from '../utils/common.js';
import {render, remove, RenderPosition} from "../utils/render.js";

import LoadMoreButtonComponent from '../components/button.js';
import FilmsContainerComponent from '../components/films.js';
import SortingComponent from '../components/sort.js';

import MovieController from "./movie.js";
// import CardComponent from '../components/card.js';
// import DetailsComponent from '../components/details.js';

import SpecialFilmsComponent from '../components/special.js';
import NoFilmsComponent from '../components/no-films.js';

const renderFilms = (filmsListContainer, items, onDataChange) => {
  return items.map((item) => {
    const movieController = new MovieController(filmsListContainer, item, onDataChange);
    movieController.render(item);
    return movieController;
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._top = new SpecialFilmsComponent(SUBTITLES[0]);
    this._most = new SpecialFilmsComponent(SUBTITLES[1]);
    this._pageMain = document.querySelector(`main`);
    this._movies = [];
    this._showedMovieControllers = [];
    this._showingMoviesCount = CARDS_QUANTITY_ON_START;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sorting.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(movies) {

    this._movies = movies;
    const sorting = this._sorting;
    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);

    if (movies.length === 0) {
      const allFilmsTitle = list.querySelector(`h2`);
      remove(allFilmsTitle);
      render(list, this._noFilms, RenderPosition.AFTERBEGIN);
      return;
    }

    render(this._pageMain, sorting, RenderPosition.AFTERBEGIN);

    render(list, this._films, RenderPosition.BEFOREEND);
    render(container, this._top, RenderPosition.BEFOREEND);
    render(container, this._most, RenderPosition.BEFOREEND);
    const box = list.querySelector(`.films-list__container`);
    const boxTop = this._top.getElement().querySelector(`.films-list__container`);
    const boxMost = this._most.getElement().querySelector(`.films-list__container`);

    const newMovies = renderFilms(box, this._movies.slice(0, CARDS_QUANTITY_ON_START), this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    const topMovies = renderFilms(boxTop, this._movies.slice(0, CARDS_QUANTITY_RATINGS), this._onDataChange);
    const mostMovies = renderFilms(boxMost, this._movies.slice(0, CARDS_QUANTITY_RATINGS), this._onDataChange);

    this._renderButton();

  }

  _renderButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);
    const box = list.querySelector(`.films-list__container`);
    const boxTop = this._top.getElement().querySelector(`.films-list__container`);
    const boxMost = this._most.getElement().querySelector(`.films-list__container`);

    render(list, this._button, RenderPosition.BEFOREEND);

    this._button.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount += CARDS_QUANTITY_MORE;
      const moviesSorted = doSorting(this._movies, this._sorting.getSortType(), prevMoviesCount, this._showingMoviesCount);
      const newMovies = renderFilms(box, moviesSorted, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._button.getElement());
      }
    });

  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));
    movieController.render(this._movies[index]);
  }

  _onSortTypeChange(sortType) {
    const type = sortType.slice(11, -1).toLowerCase();
    const showingMoviesCount = CARDS_QUANTITY_ON_START;
    const moviesSorted = doSorting(this._movies, type, 0, this._showingMoviesCount);
    const list = this._films.getElement();
    list.innerHTML = ``;
    const newMovies = renderFilms(list, moviesSorted, this._onDataChange);
    this._showedMovieControllers = newMovies;
    this._renderButton();
  }

}
