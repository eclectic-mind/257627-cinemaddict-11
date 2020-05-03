import {createElement} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

export const makeSpecialFilms = (subtitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${subtitle}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class SpecialFilms extends AbstractComponent {
  constructor(subtitle) {
    super();
    this._subtitle = subtitle;
  }
  getTemplate() {
    return makeSpecialFilms(this._subtitle);
  }
}
