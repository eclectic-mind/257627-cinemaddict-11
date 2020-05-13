import {MENU_ITEMS, FilterType} from '../constants.js';
import {getRandomNumber} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const makeMenuLink = (name) => {
  let array = name.split(` `);
  let className = array[0].toLowerCase();
  return className;
};

const menuLinks = MENU_ITEMS.map(item => makeMenuLink(item));

export const makeFilter = (filter, isChecked) => {
  const {title, count} = filter;
  const className = makeMenuLink(title);
  return (
    `<a href="#${className}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const makeMenuMarkup = (filters) => {
  const filterAll = `<a href="#${menuLinks[0]}" class="main-navigation__item main-navigation__item--active">${MENU_ITEMS[0]}</a>`;
  const aloneLink = `<a href="#${menuLinks[4]}" class="main-navigation__additional">${MENU_ITEMS[4]}</a>`;
  const filtersVisible = filters.slice(1);
  const menuMarkup = filtersVisible.map((item) => makeFilter(item, item.checked)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterAll}
    ${menuMarkup}
    </div>
    ${aloneLink}
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currentFilterType = FilterType.ALL;
  }
  getTemplate() {
    return makeMenuMarkup(this._filters);
  }
  getFilterType() {
    return this._currentFilterType;
  }
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.innerHTML;
      const filterType = filterName.split(' ')[0];
      console.log(`выбрали фильтр ` + filterType);

      if (filterType === `Stats`) {
        return;
      }
      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;
      handler(this._currentFilterType);

    });
  }
/*
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
    });
  }

*/


}
