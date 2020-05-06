import {CONTROLS_DETAILS, EMOTIONS} from '../constants.js';
import {getRandomNumber, getRandomArrayItem, getRandomFloat, getRandomTime, getRandomBoolean, createFishText, formatDate, formatDuration, makeControlLinkPopup} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';

const makeComment = (comment) => {
  const {text, emotion, author, dateComment} = comment;
  const dateFormatted = dateComment.toLocaleDateString();
  return (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${dateFormatted}</span>
    <button class="film-details__comment-delete">Delete</button>
    </p>
    </div>
    </li>`
  );
};

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

const makeEmotion = (name) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
     <label class="film-details__emoji-label" for="emoji-${name}">
     <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
     </label>`
  );
};

const makeEmotionsList = () => {
  const items = EMOTIONS;
  const markup = items.map(item => makeEmotion(item)).join(``);
  return (
    `<div class="film-details__emoji-list">
    ${markup}
    </div>`
  );
};

export const makeDetails = (movie) => {
  const {title, original, description, poster, genres, duration, date, comments, country, producer, writers, cast, rating, age, inWatchlist, isWatched, isFavorite} = movie;
  const durationFormatted = formatDuration(duration);
  const genresAll = genres.join(`, `);
  const dateFull = formatDate(date);
  const commentsAll = comments.map(item => makeComment(item)).join(``);
  const commentsQuantity = comments.length;
  const controls = makeControlsDetails(movie);
  const button = makeCloseButton();
  const emotions = makeEmotionsList();

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
      ${button}
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${producer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${cast}</td>
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
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">${genresAll}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
      ${controls}
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
        ${commentsQuantity}
        </span></h3>
        <ul class="film-details__comments-list">
        ${commentsAll}
        </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          ${emotions}
        </div>
      </section>
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
    this._emotion = null;
    this._feedbackHandler = null;

    this._subscribeOnEvents();
  }
  getTemplate() {
    return makeDetails(this._movie, {
      inWatchlist: this._inWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
      emotion: this._emotion,
      commentText: this._commentText
    });
  }

  reRender() {
    super.reRender();
  }

  recoveryListeners() {
    this.setFeedbackHandler(this._feedbackHandler);
    this._subscribeOnEvents();
  }

  setFeedbackHandler(handler) {
    this._element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, handler);

    this._feedbackHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const movie = this._movie;
    const emotion = this._emotion;
    const commentText = this._commentText;

    element.querySelector(`#emoji-smile`)
      .addEventListener(`click`, () => {
        this._setEmotionClickHandler;
        this.reRender();
      });
    element.querySelector(`#emoji-sleeping`)
      .addEventListener(`click`, () => {
        this._setEmotionClickHandler;
        this.reRender();
      });
    element.querySelector(`#emoji-puke`)
      .addEventListener(`click`, () => {
        this._setEmotionClickHandler;
        this.reRender();
      });
    element.querySelector(`#emoji-angry`)
      .addEventListener(`click`, () => {
        this._setEmotionClickHandler;
        this.reRender();
      });
/*
    element.querySelector(`.film-details__comment-input`)
      .addEventListener(`click`, this._setCommentGetter);
    this.reRender();
    */
  }

  setEmotionClickHandler(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    this._onDataChange(this, movie, Object.assign({}, movie, {
      emotion: value,
    }));
    console.log(emotion);
    let bigEmoji = document.querySelector(`.film-details__add-emoji-label`);
    bigEmoji.innerHTML = `<img src="images/emoji/${value}.png" width="55" height="55" alt="emoji-smile">`;
  };

  /* setCommentGetter(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    this._onDataChange(this, movie, Object.assign({}, movie, {
      commentText: value,
    }));
  };
  */

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }
/*
  setEmotionClickHandler(handler) {
    this.getElement().querySelector(`#emoji-smile`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`#emoji-sleeping`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`#emoji-puke`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`#emoji-angry`)
      .addEventListener(`click`, handler);
  }
*/
  setPopupCloserClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
