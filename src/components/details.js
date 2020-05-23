import {CONTROLS_DETAILS} from '../constants.js';
import {getRandomNumber, getRandomArrayItem, getRandomFloat, getRandomTime, getRandomBoolean, createFishText, makeControlLinkPopup, formatDate, formatDuration} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {encode} from "he";

const makeControl = (name, condition = true) => {
  const short = makeControlLinkPopup(name);
  const active = !!condition ? `checked` : ``;
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${short}" name="${short}" ${active}>
     <label for="${short}" class="film-details__control-label film-details__control-label--${short}">${name}</label>`
  );
};

const makeControlsDetails = (movie) => {
  const names = CONTROLS_DETAILS;
  const addToList = makeControl(names[0], movie.inWatchlist);
  const markAsWatched = makeControl(names[1], movie.isWatched);
  const markAsFavorite = makeControl(names[2], movie.isFavorite);
  return (
    `${addToList}
     ${markAsWatched}
     ${markAsFavorite}`
  );
};

const makeCloseButton = () => {
  return (
  `<button class="film-details__close-btn" type="button">close</button>`
  );
}

export const makeDetails = (movie, options = {}) => {
  const {title, original, description, poster, genres, duration, date, country, producer, writers, cast, rating, age, inWatchlist, isWatched, isFavorite, watchingDate} = movie;
  const durationFormatted = formatDuration(duration);
  const genresAll = genres.join(`, `);
  const dateFull = formatDate(date);
  const controls = makeControlsDetails(movie);
  const button = makeCloseButton();
  const titleEncoded = encode(title);
  const originalEncoded = encode(original);
  const descriptionEncoded = encode(description);
  const countryEncoded = encode(country);
  const producerEncoded = encode(producer);
  const writersEncoded = encode(writers);
  const castEncoded = encode(cast);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
      ${button}
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${titleEncoded}">
          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${titleEncoded}</h3>
              <p class="film-details__title-original">Original: ${originalEncoded}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${producerEncoded}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersEncoded}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${castEncoded}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateFull}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${durationFormatted}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${countryEncoded}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">${genresAll}</td>
            </tr>
          </table>
          <p class="film-details__film-description">${descriptionEncoded}</p>
        </div>
      </div>
      <section class="film-details__controls">
      ${controls}
      </section>
    </div>
    <div class="form-details__bottom-container">

    </div>
  </form>
</section>`
  );

};

export default class Details extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._inWatchlist = !!movie.inWatchlist;
    this._isWatched = !!movie.isWatched;
    this._isFavorite = !!movie.isFavorite;
    this._watchingDate = movie.watchingDate;
  }

  getTemplate() {
    return makeDetails(this._movie, {
      inWatchlist: this._inWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
      watchingDate: this._watchingDate,
    });
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setPopupCloserClickHandler(this._popupCloserClickHandler);
    this.setMarkAsFavoriteClickHandler(this._markAsFavoriteClickHandler);
    this.setMarkAsWatchedClickHandler(this._markAsWatchedClickHandler);
    this.setAddToWatchlistClickHandler(this._addToWatchListClickHandler);
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
    this._addToWatchListClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
    this._markAsWatchedClickHandler = handler;
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
    this._markAsFavoriteClickHandler = handler;
  }

  setPopupCloserClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._popupCloserClickHandler = handler;
  }

}
