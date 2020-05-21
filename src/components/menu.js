import {MENU_ITEMS, FilterType, ACTIVE_MENU_CLASS} from '../constants.js';
import {getRandomNumber} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const makeMenuLink = (name) => {
  let array = name.split(` `);
  let className = array[0].toLowerCase();
  return className;
};

const menuLinks = MENU_ITEMS.map(item => makeMenuLink(item));

export const makeFilter = (filter, currentFilterType) => {
  const {title, count, checked} = filter;
  return (
    `<a href="#${title}" class="main-navigation__item ${checked ? ACTIVE_MENU_CLASS : ``}">${title} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const makeMenuMarkup = (filters, currentFilterType) => {
  const filterAll = `<a href="#${menuLinks[0]}" class="main-navigation__item ${filters[0].checked ? ACTIVE_MENU_CLASS : ``}">${MENU_ITEMS[0]}</a>`;
  const aloneLink = `<a href="#${menuLinks[4]}" class="main-navigation__additional">${MENU_ITEMS[4]}</a>`;
  const filtersVisible = filters.slice(1);
  const menuMarkup = filtersVisible.map((item) => makeFilter(item, currentFilterType)).join(`\n`);
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

export default class Menu extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return makeMenuMarkup(this._filters);
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.innerHTML;
      const filterType = filterName.split(' ')[0];

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

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }
}
