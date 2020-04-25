import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

export const makeSpecialFilms = (subtitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${subtitle}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

/*
export default class SpecialFilms {
  constructor(subtitle) {
    this._subtitle = subtitle;
    this._element = null;
  }
  getTemplate() {
    return makeSpecialFilms(this._subtitle);
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
*/

export default class SpecialFilms extends AbstractComponent {
  constructor(subtitle) {
    super();
    this._subtitle = subtitle;
  }
  getTemplate() {
    return makeSpecialFilms();
  }
}
