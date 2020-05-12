import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from '../constants.js';
import {doSorting} from '../utils/common.js';
import {render, remove, RenderPosition} from "../utils/render.js";
import LoadMoreButtonComponent from '../components/button.js';
import FilmsContainerComponent from '../components/films.js';
import SortingComponent from '../components/sort.js';
import MovieController from "./movie.js";
import SpecialFilmsComponent from '../components/special.js';
import NoFilmsComponent from '../components/no-films.js';
// import Movies from "./models/movies.js";

const renderFilms = (filmsListContainer, items, onDataChange, onViewChange) => {
  return items.map((item) => {
    const movieController = new MovieController(filmsListContainer, item, onDataChange, onViewChange);
    movieController.render(item);
    return movieController;
  });
};

export default class BoardController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._top = new SpecialFilmsComponent(SUBTITLES[0]);
    this._most = new SpecialFilmsComponent(SUBTITLES[1]);
    this._pageMain = document.querySelector(`main`);
    // this._movies = [];
    this._showedMovieControllers = [];
    this._showingMoviesCount = CARDS_QUANTITY_ON_START;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sorting.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {

    // this._movies = movies;
    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);
    const box = list.querySelector(`.films-list__container`);
    const boxTop = this._top.getElement().querySelector(`.films-list__container`);
    const boxMost = this._most.getElement().querySelector(`.films-list__container`);

    const movies = this._moviesModel.getMovies();
    console.log(movies);
    const sorting = this._sorting;

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

    // const moviesSorted = doSorting((this._moviesModel.getMovies(), this._sorting.getSortType());
    const moviesSorted = doSorting(movies, this._sorting.getSortType());

    const newFilmCards = renderFilms(box, moviesSorted.slice(0, CARDS_QUANTITY_ON_START), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilmCards);
    const topMovies = doSorting(movies, `rating`);
    const mostMovies = doSorting(movies, `comments`);
    const topFilmCards = renderFilms(boxTop, topMovies.slice(0, CARDS_QUANTITY_RATINGS), this._onDataChange, this._onViewChange);
    const mostFilmCards = renderFilms(boxMost, mostMovies.slice(0, CARDS_QUANTITY_RATINGS), this._onDataChange, this._onViewChange);

    this._renderMovies(moviesSorted.slice(0, this._showingMoviesCount));
    this._renderButton(moviesSorted);
  }

  _renderButton(moviesSorted) {
    /* if (this._showingMoviesCount >= moviesSorted.length) {
      return;
    }
    */

    remove(this._buttonComponent);

    if (this._showingMoviesCount >= this._moviestasksModel.getMovies().length) {
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
      const movies = this._moviesModel.getMovies();
      this._showingMoviesCount += CARDS_QUANTITY_MORE;
      const additionalMovies = moviesSorted.slice(prevMoviesCount, this._showingMoviesCount);
      const newFilmCards = renderFilms(box, additionalMovies, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newFilmCards);
      /* if (this._showingMoviesCount >= moviesSorted.length) {
        remove(this._button.getElement());
        this._button.removeElement();
      }
      */
    });

  }

  _onDataChange(movieController, oldData, newData) {
    // const index = this._movies.findIndex((it) => it === oldData);
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
    // this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));
    // movieController.render(this._movies[index]);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((item) => item.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const showingMoviesCount = CARDS_QUANTITY_ON_START;
    const moviesSorted = doSorting(this._moviesModel.getMovies(), sortType);
    const list = this._films.getElement();
    list.innerHTML = ``;
    const firstMovies = moviesSorted.slice(0, showingMoviesCount);
    const newFilmCards = renderFilms(list, firstMovies, this._onDataChange);
    this._showedMovieControllers = newFilmCards;

    remove(this._button.getElement());
    this._button.removeElement();
    this._renderButton(moviesSorted);
  }

}
