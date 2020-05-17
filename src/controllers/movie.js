// import {EMOTIONS} from '../constants.js';

import {render, replace, remove, RenderPosition} from "../utils/render.js";

// import CommentsComponent from "../components/comments.js";
import CommentsModel from "../models/comments.js";
import CommentsController from "../controllers/comments.js";
import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";

export default class MovieController {

  constructor(container, movie, onDataChange) {
    this._container = container;
    this._card = null;
    this._popup = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    // this._onEnterKeyDown = this._onEnterKeyDown.bind(this);
    this._body = document.querySelector(`body`);
    // this._emotion = null;
    // this._commentText = ``;
    this._commentsModel = null;
    this._commentsComponent = null;
  }

  render(movie) {
    const oldCardController = this._card;
    const oldPopupController = this._popup;

    this._card = new CardComponent(movie);
    this._popup = new DetailsComponent(movie);

    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(movie);

    const body = this._body;
    const card = this._card.getElement();
    const popup = this._popup.getElement();

    const setPopupHandlers = () => {
      this._popup.setPopupCloserClickHandler((evt) => {
        evt.preventDefault();
        remove(this._popup);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
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

    };

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
      document.addEventListener(`keydown`, this._onEscKeyDown);
      if (!body.querySelector(`.film-details`)) {
        render(body, this._popup, RenderPosition.BEFOREEND);
        setPopupHandlers();
      }
            console.log(movie.comments);
    });

    setPopupHandlers();

    if (oldCardController && oldPopupController) {
      replace(this._card, oldCardController);
      replace(this._popup, oldPopupController);
    } else {
      render(this._container, this._card, RenderPosition.BEFOREEND);
    }

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      remove(this._popup);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  /* _onEnterKeyDown(evt) {
    const isEnterKey = evt.key === `Enter`;
    if (isEnterKey) {
      console.log(`нажали на Enter`);
    }
  } */

  destroy() {
    remove(this._popup);
    remove(this._card);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    // document.removeEventListener(`keydown`, this._onEnterKeyDown);
  }

};
