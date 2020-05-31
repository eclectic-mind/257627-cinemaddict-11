import AbstractSmartComponent from './abstract-smart-component.js';
import {ALL_MOVIES_TEXT, HIDDEN_CLASS} from '../constants.js';

export const makeFilmsList = () => {
  return (
    `<section class="films-list">
    <h2 class="films-list__title ${HIDDEN_CLASS}">${ALL_MOVIES_TEXT}</h2>
    </section>`
  );
};

export default class FilmsList extends AbstractSmartComponent {
  getTemplate() {
    return makeFilmsList();
  }

}
