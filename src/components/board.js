import AbstractSmartComponent from './abstract-smart-component.js';

export const makeBoard = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    <section>`
  );
};

export default class Board extends AbstractSmartComponent {
  getTemplate() {
    return makeBoard();
  }

  show() {
    super.show();
    this.rerender();
  }

  hide() {
    super.hide();
    this.rerender();
  }
}
