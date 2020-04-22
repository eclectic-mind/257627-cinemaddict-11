import {BUTTON_NAME} from '../constants.js';
import {createElement} from '../utils.js';

export const makeButton = () => {
  return (
    `<button class="films-list__show-more">${BUTTON_NAME}</button>`
  );
};

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeButton();
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
