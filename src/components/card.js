// import {cutText, formatDuration, makeControlLink, createElement} from '../utils.js';
import {cutText, formatDuration, makeControlLink} from '../utils/common.js'
import {BRIEF_MAX, CONTROLS_CARD} from '../constants.js';
import AbstractComponent from './abstract-component.js';

const makeControlsCard = () => {
  const names = CONTROLS_CARD;
  const shorts = names.map(item => makeControlLink(item));
  return (
    `<button class="film-card__controls-item button film-card__controls-item--add-to-${shorts[0]}">${names[0]}</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-${shorts[1]}">${names[1]}</button>
    <button class="film-card__controls-item button film-card__controls-item--${shorts[2]}">${names[2]}</button>`
  );
}

export const makeCard = (movie) => {
  const {title, original, description, poster, genres, duration, date, comments, country, producer, writers, cast, rating, age} = movie;
  const year = date.getFullYear();
  const durationFormatted = formatDuration(duration);
  const brief = description > BRIEF_MAX ? cutText(description, BRIEF_MAX) : description;
  const genreMain = genres[0];
  const commentsQuantity = comments.length;
  const controlsAll = makeControlsCard();

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${durationFormatted}</span>
            <span class="film-card__genre">${genreMain}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${brief}</p>
          <a class="film-card__comments">${commentsQuantity}  comments</a>
          <form class="film-card__controls">
          ${controlsAll}
          </form>
        </article>`
  );
};

/*
export default class Card {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }
  getTemplate() {
    return makeCard(this._movie);
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

export default class Card extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }
  getTemplate() {
    return makeCard(this._movie);
  }
}
