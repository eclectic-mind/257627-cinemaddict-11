import {EMOTIONS} from '../constants.js';
import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class MovieController {

  constructor(container, movie, onDataChange) {
    // this._movie = movie;
    this._container = container;
    // this._card = new CardComponent(movie);
    // this._popup = new DetailsComponent(movie);
    this._card = null;
    this._popup = null;
    this._onDataChange = onDataChange;
    this._body = document.querySelector(`body`);
    this._emotion = null;
  }

  render(movie) {
    const oldCardController = this._card;
    const oldPopupController = this._popup;

    this._card = new CardComponent(movie);
    this._popup = new DetailsComponent(movie);
    const body = this._body;
    const card = this._card.getElement();
    const popup = this._popup.getElement();
    const emotion = this._emotion;

    this._card.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        inWatchlist: !movie.inWatchlist,
      }));
    });

    this._card.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._card.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._card.setPopupOpenerClickHandler((evt) => {
      evt.preventDefault();
      if (!body.querySelector(`.film-details`)) {
        render(body, this._popup, RenderPosition.BEFOREEND);
        let bigEmoji = document.querySelector(`.film-details__add-emoji-label`);
        if (emotion !== null) {
          bigEmoji.innerHTML = `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`;
        }
        // console.log(bigEmoji);
      }
    });

    this._popup.setPopupCloserClickHandler((evt) => {
      evt.preventDefault();
      remove(this._popup.getElement());
    });

    this._popup.setAddToWatchlistClickHandler((evt) => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        inWatchlist: !movie.inWatchlist,
      }));
    });

    this._popup.setMarkAsWatchedClickHandler((evt) => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._popup.setMarkAsFavoriteClickHandler((evt) => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    /* this._popup.setFeedbackClickHandler((evt) => {
      evt.preventDefault();
      let value = evt.target.value;
      this._onDataChange(this, movie, Object.assign({}, movie, {
        emotion: value,
      }));
      let bigEmoji = document.querySelector(`.film-details__add-emoji-label`);
      bigEmoji.innerHTML = `<img src="images/emoji/${value}.png" width="55" height="55" alt="emoji-smile">`;
    });
    */

    if (oldCardController && oldPopupController) {
      replace(this._card, oldCardController);
      replace(this._popup, oldPopupController);
    } else {
      render(this._container, this._card, RenderPosition.BEFOREEND);
    }

  }

};
