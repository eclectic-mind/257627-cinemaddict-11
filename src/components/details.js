import {CONTROLS_DETAILS} from '../constants.js';
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

const makeControl = (name, condition = false) => {
  const short = makeControlLinkPopup(name);
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${short}" name="${short}">
     <label for="watchlist" class="film-details__control-label film-details__control-label--${short}">${name}</label>`
  );
};

const makeControlsDetails = (movie) => {
  const names = CONTROLS_DETAILS;
  let controlsAll = names.map(item => makeControl(item));
  /* const addToList = makeControl(names[0], !movie.inWatchlist);
  const markAsWatched = makeControl(names[1], !movie.isWatched);
  const markAsFavorite = makeControl(names[2], !movie.isFavorite);
  return (
    `${addToList}
     ${markAsWatched}
     ${markAsFavorite}`
  );
  */
  return controlsAll.join(``);
};

const makeCloseButton = () => {
  return (
  `<button class="film-details__close-btn" type="button">close</button>`
  );
};

export const makeDetails = (movie) => {
  const {title, original, description, poster, genres, duration, date, comments, country, producer, writers, cast, rating, age} = movie;
  const durationFormatted = formatDuration(duration);
  const genresAll = genres.join(`, `);
  // const dateFull = date.toDateString().slice(3);
  const dateFull = formatDate(date);
  const commentsAll = comments.map(item => makeComment(item)).join(``);
  const commentsQuantity = comments.length;
  const controls = makeControlsDetails(movie);
  const button = makeCloseButton();

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

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
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
  }
  getTemplate() {
    return makeDetails(this._movie);
  }
}
