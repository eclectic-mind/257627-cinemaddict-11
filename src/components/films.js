import AbstractComponent from './abstract-component.js';

export const makeFilmsContainer = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return makeFilmsContainer();
  }
};
