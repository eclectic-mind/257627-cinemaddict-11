import {SORT_BY, SortType, ACTIVE_SORT_CLASS} from '../constants.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const makeSortLink = (name, currentSortType) => {
  return (
    `<li><a href="#" class="sort__button ${currentSortType === name ? ACTIVE_SORT_CLASS : ``}" data-sort-type="${SortType[name.toUpperCase()]}">Sort by ${name}</a></li>`
  );
};

export const makeSortMarkup = (currentSortType) => {
  const names = SORT_BY;
  const links = names.map((item) => makeSortLink(item, currentSortType)).join(``);;
  return (
    `<ul class="sort">
    ${links}
    </ul>`
  );
};

export default class Sorting extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return makeSortMarkup(this._currentSortType);
  }
  getSortType() {
    return this._currentSortType;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _subscribeOnEvents() {
    document.querySelector(`.sort`)
      .addEventListener(`click`, this.setSortTypeChangeHandler);
    // this.getElement().addEventListener(`click`, this.setSortTypeChangeHandler);
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
      this.rerender();
    });
    this._sortTypeChangeHandler = handler;
  }
}
