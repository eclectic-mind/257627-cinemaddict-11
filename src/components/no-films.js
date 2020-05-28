import AbstractComponent from './abstract-component.js';
import {NO_MOVIES_TEXT} from '../constants.js';

const createNoFilmsTemplate = () => {
  return (
    `<h2 class="films-list__title">${NO_MOVIES_TEXT}</h2>`
  );
};

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
