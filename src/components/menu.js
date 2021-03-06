import {MENU_ITEMS, ACTIVE_MENU_CLASS, Mode} from '../constants.js';
import {makeMenuLink} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const menuLinks = MENU_ITEMS.map((item) => makeMenuLink(item));

export const makeFilter = (filter) => {
  const {title, count, checked} = filter;
  return (
    `<a href="#${title}" class="main-navigation__item ${checked ? ACTIVE_MENU_CLASS : ``}">${title} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const makeMenuMarkup = (filters) => {
  const filterAll = `<a href="#${menuLinks[0]}" class="main-navigation__item ${filters[0].checked ? ACTIVE_MENU_CLASS : ``}">${MENU_ITEMS[0]}</a>`;
  const aloneLink = `<a href="#${menuLinks[4]}" class="main-navigation__additional ${filters[4].checked ? ACTIVE_MENU_CLASS : ``}">${MENU_ITEMS[4]}</a>`;
  const filtersVisible = filters.slice(1, 4);
  const menuMarkup = filtersVisible.map((item) => makeFilter(item)).join(`\n`);
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

  setFilterChangeHandler(handlerFiltering) {
    this._filterChangeHandler = handlerFiltering;
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const element = evt.target;
      if (element.tagName !== `A`) {
        return;
      }

      const filterName = element.innerHTML;
      const filterType = filterName.split(` `)[0];

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;
      handlerFiltering(this._currentFilterType);
    });

  }

  setToggleMode(handler) {
    this._toggleModehandler = handler;

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const element = evt.target;
      if (element.tagName !== `A`) {
        return;
      }
      const clicked = element.href;
      const link = clicked.toLowerCase().split(`#`)[1];
      const value = link === `stats` ? Mode.CHARTS : Mode.BOARD;
      this._toggleModehandler(value);
    });
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
    this.setToggleMode(this._toggleModehandler);
  }

}
