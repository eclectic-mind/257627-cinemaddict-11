import {CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, SUBTITLES} from '../constants.js';
import {doSorting, checkNoRatings, checkNoComments} from '../utils/common.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import ButtonComponent from '../components/button.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsContainerComponent from '../components/films-container.js';
import SortingComponent from '../components/sorting.js';
import MovieController from './movie.js';
import SpecialFilmsContainerComponent from '../components/special-films-container.js';
import NoFilmsComponent from '../components/no-films.js';

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
    this._filmsList = new FilmsListComponent();
    this._filmsContainer = new FilmsContainerComponent();
    this._button = new ButtonComponent();
    this._showedMovieControllers = [];
    this._showingMoviesCount = CARDS_QUANTITY_ON_START;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._sorting.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterTypeChange);
    this._top = null;
    this._most = null;
  }

  render() {

    const container = this._container.getElement();
    const list = this._filmsList;
    // const films = this._filmsContainer;
    const movies = this._moviesModel.getMovies();
    const sorting = this._sorting;

    if (movies.length === 0) {
      const allFilmsTitle = list.querySelector(`h2`);
      remove(allFilmsTitle);
      render(list, this._noFilms, RenderPosition.AFTERBEGIN);
      return;
    }

    render(container, sorting, RenderPosition.BEFOREBEGIN);
    render(container, list, RenderPosition.BEFOREEND);
    // render(list.getElement(), films, RenderPosition.BEFOREEND);

    const moviesSorted = doSorting(movies, this._sorting.getSortType());

    this._renderMovies(moviesSorted);
    this._renderButton(moviesSorted);
    this._renderTopMovies(moviesSorted);
    this._renderMostMovies(moviesSorted);
  }

  _renderMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    const list = this._filmsList;
    const films = this._filmsContainer;

    render(list.getElement(), films, RenderPosition.BEFOREEND);

    const newFilmCards = renderFilms(films.getElement(), movies.slice(0, CARDS_QUANTITY_ON_START), this._api, this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilmCards);
  }

  _renderNoMovies() {
    const container = this._container.getElement();
    const list = this._filmsList.getElement();
    list.innerHTML = ``;
    // const films = this._filmsContainer.getElement();
    render(list, this._noFilms, RenderPosition.AFTERBEGIN);
    // return;
  }

  _renderTopMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    if (!checkNoRatings(movies)) {
      this._top = new SpecialFilmsContainerComponent(SUBTITLES[0]);
      const filmsTop = this._top.getElement().querySelector(`.films-list__container`);
      const topMovies = doSorting(movies, `rating`);
      renderFilms(filmsTop, topMovies.slice(0, CARDS_QUANTITY_RATINGS), this._api, this._onDataChange);
      render(container, this._top, RenderPosition.BEFOREEND);
    }
  }

  _renderMostMovies(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    if (!checkNoComments(movies)) {
      this._most = new SpecialFilmsContainerComponent(SUBTITLES[1]);
      const filmsMost = this._most.getElement().querySelector(`.films-list__container`);
      const mostMovies = doSorting(movies, `comments`);
      renderFilms(filmsMost, mostMovies.slice(0, CARDS_QUANTITY_RATINGS), this._api, this._onDataChange);
      render(container, this._most, RenderPosition.BEFOREEND);
    }
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderButton(movies = this._moviesModel.getMovies()) {
    const container = this._container.getElement();
    const list = this._filmsList.getElement();
    const films = this._filmsContainer.getElement();

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const moviesSorted = doSorting(movies, this._sorting.getSortType());
    render(list, this._button, RenderPosition.BEFOREEND);

    this._button.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount += CARDS_QUANTITY_MORE;
      const additionalMovies = moviesSorted.slice(prevMoviesCount, this._showingMoviesCount);
      const newFilmCards = renderFilms(films, additionalMovies, this._api, this._onDataChange);
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

 /*  _onSortTypeChange(sortType) {
    const showingMoviesCount = CARDS_QUANTITY_ON_START;
    const moviesSorted = doSorting(this._moviesModel.getMovies(), sortType);

    const list = this._filmsList.getElement();
    const films = this._filmsContainer;
    list.innerHTML = ``;

    render(list, films, RenderPosition.BEFOREEND);

    this._renderMovies(moviesSorted);
    remove(this._button);
    this._button.removeElement();
    this._renderButton(moviesSorted);
  } */

  /* _onSortTypeChange(sortType) {
    const showingMoviesCount = CARDS_QUANTITY_ON_START;
    const moviesSorted = doSorting(this._moviesModel.getMovies(), sortType);
    const list = this._filmsList.getElement();
    // list.innerHTML = ``;
    const films = this._filmsContainer;
    films.innerHTML = ``;
    render(list, films, RenderPosition.BEFOREEND);

console.log(list);


    const firstMovies = moviesSorted.slice(0, showingMoviesCount);
    const newFilmCards = renderFilms(films.getElement(), firstMovies, this._api, this._onDataChange);
    // const newFilmCards = renderFilms(list, firstMovies, this._api, this._onDataChange);
    // this._showedMovieControllers = newFilmCards;
    remove(this._button);
    this._button.removeElement();
    this._renderMovies(moviesSorted);
    this._renderButton(moviesSorted);
  } */

  _onSortTypeChange(sortType) {
    this._removeMovies();
    remove(this._button);
    this._button.removeElement();

    const moviesSorted = doSorting(this._moviesModel.getMovies(), sortType);
    this._renderMovies(moviesSorted);
    this._renderButton(moviesSorted);
  }

  _onFilterTypeChange() {
    this._removeMovies();
    remove(this._button);
    this._button.removeElement();
    const movies = this._moviesModel.getMovies();
    if (movies.length === 0) {
      this._renderNoMovies();
    } else {
      this._renderMovies(movies);
      this._renderButton(movies);
    }
  }

}
