import {doFiltration, collectAllComments} from "../utils/common.js";
import {FilterType} from "../constants.js";

export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._comments = collectAllComments(this._movies);
  }

  getMovies() {
    return doFiltration(this._movies, this._activeFilterType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  deleteComment(id, comments) {
    const index = comments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    comments = [].concat(comments.slice(0, index), comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addComment(newComment, comments) {
    comments = [].concat(newComment, comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
