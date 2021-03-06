import AbstractSmartComponent from './abstract-smart-component.js';
import {countAllMovies} from "../utils/common.js";

export const makeStats = (movies = null) => {
  const all = countAllMovies(movies);
  return (
    `<p>${all} movies inside</p>`
  );
};

export default class FooterStats extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._movies = this._moviesModel.getMoviesAll();
  }

  getTemplate() {
    return makeStats(this._movies);
  }

}
