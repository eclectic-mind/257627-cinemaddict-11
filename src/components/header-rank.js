import {USER_RANKS, AVATAR_SIZE} from '../constants.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {countAllMovies, getWatched, calculateRank} from "../utils/common.js";

export const makeUserRank = (movies) => {
  const quantity = getWatched(movies).length;
  const rank = calculateRank(quantity);
  if (quantity < 1) {
    return ` `;
  }

  else {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
      </section>`
    );
  }
};

export default class Rank extends AbstractSmartComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return makeUserRank(this._movies);
  }

  rerender() {
    super.rerender();
  }
}
