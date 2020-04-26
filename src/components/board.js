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

export default class Board extends AbstractComponent {
  getTemplate() {
    return makeBoard();
  }
}
