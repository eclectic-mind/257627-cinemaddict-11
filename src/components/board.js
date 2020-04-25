// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

export const makeBoard = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      </section>
<section>`
  );
};

/*
export default class Board {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeBoard();
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

export default class Board extends AbstractComponent {
  getTemplate() {
    return makeBoard();
  }
}
