import {USER_RANKS} from '../constants.js';
import {createElement} from '../utils.js';

export const makeUserRank = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${USER_RANKS[2]}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class Rank {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeUserRank();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
};
