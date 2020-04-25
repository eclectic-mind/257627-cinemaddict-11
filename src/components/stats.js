import {STATS_ALL} from '../constants.js';
// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

export const makeStats = () => {
  return (
    `<p>${STATS_ALL} movies inside</p>`
  );
};

/* export default class Stats {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeStats();
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
export default class Stats extends AbstractComponent {
  getTemplate() {
    return makeStats();
  }
}
