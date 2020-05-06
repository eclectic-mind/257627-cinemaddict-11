import {cutText, formatDuration, makeControlLink} from '../utils/common.js'
import {BRIEF_MAX, CONTROLS_CARD} from '../constants.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const makeControlButton = (name, condition = true) => {
  const short = makeControlLink(name);
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${short} ${!!condition ? `film-card__controls-item--active` : ``}">${name}</button>`
  );
};

const makeControlsCard = (movie) => {
  const names = CONTROLS_CARD;
  const addToList = makeControlButton(names[0], movie.inWatchlist);
  const markAsWatched = makeControlButton(names[1], movie.isWatched);
  const markAsFavorite = makeControlButton(names[2], movie.isFavorite);
  return (
    `${addToList}
     ${markAsWatched}
     ${markAsFavorite}`
  );
};

// export const makeCard = (movie, options = {}) => {
  const makeCard = (movie) => {
  const {title, original, description, poster, genres, duration, date, comments, country, producer, writers, cast, rating, age, emotion, inWatchlist, isWatched, isFavorite} = movie;
  // const {inWatchlist, isWatched, isFavorite} = options;
  const year = date.getFullYear();
  const durationFormatted = formatDuration(duration);
  const brief = description > BRIEF_MAX ? cutText(description, BRIEF_MAX) : description;
  const genreMain = genres[0];
  const commentsQuantity = comments.length;
  const controlsAll = makeControlsCard(movie);

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

export default class Card extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._inWatchlist = !!movie.inWatchlist;
    this._isWatched = !!movie.isWatched;
    this._isFavorite = !!movie.isFavorite;

    // this._subscribeOnEvents();
  }

  getTemplate() {
    return makeCard(this._movie, {
      inWatchlist: this._inWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite
    });
  }

  /*
  reset() {
    const movie = this._movie;
    this._inWatchlist = Object.values(movie.inWatchlist).some(Boolean);
    this._isWatched = Object.values(movie.isWatched).some(Boolean);
    this._isFavorite = Object.values(movie.isFavorite).some(Boolean);
    this.reRender();
  }
  */

  reRender() {
    super.reRender();
  }

  /* recoveryListeners() {
    this.setControlsClickHandler(this._controlHandler);
    this._subscribeOnEvents();
  }
  */

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setPopupOpenerClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

}
