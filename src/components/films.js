import {createElement} from '../utils.js';

export const makeFilmsContainer = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeFilmsContainer();
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
