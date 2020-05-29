import {CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, SUBTITLES} from '../constants.js';
import {doSorting, checkNoRatings, checkNoComments} from '../utils/common.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import LoadMoreButtonComponent from '../components/button.js';
import FilmsContainerComponent from '../components/films.js';
import SortingComponent from '../components/sort.js';
import MovieController from './movie.js';
import SpecialFilmsComponent from '../components/special.js';
import NoFilmsComponent from '../components/no-films.js';
import MoviesModel from '../models/movies.js';

const renderFilms = (filmsListContainer, items, api, onDataChange) => {
  return items.map((item) => {
    const movieController = new MovieController(filmsListContainer, item, api, onDataChange);
    movieController.render(item);
    return movieController;
  });
};

export default class BoardController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._pageMain = document.querySelector(`main`);
    this._moviesModel = moviesModel;
    this._api = api;
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._showedMovieControllers = [];
    this._showingMoviesCount = CARDS_QUANTITY_ON_START;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._sorting.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterTypeChange);
    this._top = null;
    this._most = null;
  }

  render() {

    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);
    const box = this._films.getElement();
    const movies = this._moviesModel.getMovies();
    const sorting = this._sorting;
    const comments = this._comments;
    const top = this._top;
    const most = this._most;

    if (movies.length === 0) {
      const allFilmsTitle = list.querySelector(`h2`);
      remove(allFilmsTitle);
      render(list, this._noFilms, RenderPosition.AFTERBEGIN);
      return;
    }

    render(list, this._films, RenderPosition.BEFOREEND);
    render(container, sorting, RenderPosition.BEFOREBEGIN);

    const moviesSorted = doSorting(movies, this._sorting.getSortType());

    this._renderMovies(moviesSorted);
    this._renderButton(moviesSorted);
    this._renderTopMovies(moviesSorted);
    this._renderMostMovies(moviesSorted);
  }

  _renderMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);
    const box = this._films.getElement();

    const newFilmCards = renderFilms(box, movies.slice(0, CARDS_QUANTITY_ON_START), this._api, this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilmCards);
  }

  _renderTopMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    if (!checkNoRatings(movies)) {
      this._top = new SpecialFilmsComponent(SUBTITLES[0]);
      const boxTop = this._top.getElement().querySelector(`.films-list__container`);
      const topMovies = doSorting(movies, `rating`);
      const topFilmCards = renderFilms(boxTop, topMovies.slice(0, CARDS_QUANTITY_RATINGS), this._api, this._onDataChange);
      render(container, this._top, RenderPosition.BEFOREEND);
    }
  }

  _renderMostMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    if (!checkNoComments(movies)) {
      this._most = new SpecialFilmsComponent(SUBTITLES[1]);
      const boxMost = this._most.getElement().querySelector(`.films-list__container`);
      const mostMovies = doSorting(movies, `comments`);
      const mostFilmCards = renderFilms(boxMost, mostMovies.slice(0, CARDS_QUANTITY_RATINGS), this._api, this._onDataChange);
      render(container, this._most, RenderPosition.BEFOREEND);
    }
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderButton(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);
    const box = this._films.getElement();

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const moviesSorted = doSorting(movies, this._sorting.getSortType());
    render(list, this._button, RenderPosition.BEFOREEND);

    this._button.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      const movies = this._moviesModel.getMovies();
      this._showingMoviesCount += CARDS_QUANTITY_MORE;
      const additionalMovies = moviesSorted.slice(prevMoviesCount, this._showingMoviesCount);
      const newFilmCards = renderFilms(box, additionalMovies, this._api, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newFilmCards);
      if (this._showingMoviesCount >= moviesSorted.length) {
        remove(this._button);
        this._button.removeElement();
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);
        if (isSuccess) {
          movieController.render(movieModel);
        }
      });
  }

  _onSortTypeChange(sortType) {
    const showingMoviesCount = CARDS_QUANTITY_ON_START;
    const moviesSorted = doSorting(this._moviesModel.getMovies(), sortType);
    const list = this._films.getElement();
    list.innerHTML = ``;
    const firstMovies = moviesSorted.slice(0, showingMoviesCount);
    const newFilmCards = renderFilms(list, firstMovies, this._api, this._onDataChange);
    this._showedMovieControllers = newFilmCards;
    remove(this._button);
    this._button.removeElement();
  }

  _onFilterTypeChange() {
    this._removeMovies();
    remove(this._button);
    this._button.removeElement();
    const movies = this._moviesModel.getMovies();
    this._renderMovies(movies);
    this._renderButton(movies);
  }

}
