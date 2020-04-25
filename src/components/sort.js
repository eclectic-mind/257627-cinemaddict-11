import {SORT_BY} from '../constants.js';
// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

const makeSortLink = (name) => {
  return (
    `<li><a href="#" class="sort__button">Sort by ${name}</a></li>`
  );
};

export const makeSortMarkup = () => {
  const names = SORT_BY;
  const links = names.map((item) => makeSortLink(item)).join(``);;
  return (
    `<ul class="sort">
    ${links}
    </ul>`
  );
};

/*
export default class Sorting {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeSortMarkup();
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

export default class Sorting extends AbstractComponent {
  getTemplate() {
    return makeSortMarkup();
  }
}
