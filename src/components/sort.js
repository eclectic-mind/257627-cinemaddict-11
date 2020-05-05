import {SORT_BY, SortType} from '../constants.js';
import AbstractComponent from './abstract-component.js';

const makeSortLink = (name) => {
  const param = '${SortType.' + name.toUpperCase() + '}';
  // const param = name.toUpperCase();
  return (
    // `<li><a href="#" class="sort__button" data-sort-type="${param}">Sort by ${name}</a></li>`
    `<li><a href="#" class="sort__button" data-sort-type="${SortType[name.toUpperCase()]}">Sort by ${name}</a></li>`
    // `<li><a href="#" class="sort__button" data-sort-type="SortType.${name}">Sort by ${name}</a></li>`
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

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    // this._currentSortType = `default`;
  }
  getTemplate() {
    return makeSortMarkup();
  }
  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);

      console.log(this._currentSortType);
    });
  }
}
