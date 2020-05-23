// import {STATS_ALL} from '../constants.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {countAllMovies} from "../utils/common.js";

export const makeStats = (movies) => {
  const all = countAllMovies(movies);
  return (
    `<p>${all} movies inside</p>`
  );
};

export default class Stats extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return makeStats(this._movies);
  }
}
