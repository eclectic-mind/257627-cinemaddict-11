import AbstractSmartComponent from './abstract-smart-component.js';

export const makeBoard = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class Board extends AbstractSmartComponent {
  getTemplate() {
    return makeBoard();
  }

}
