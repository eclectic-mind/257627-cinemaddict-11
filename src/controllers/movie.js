// import {EMOTIONS} from '../constants.js';
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import CommentsComponent from "../components/comments.js";
import CommentsModel from "../models/comments.js";
import CommentsController from "../controllers/comments.js";
import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {generateComment, generateCommentsArray} from '../mock/data.js';

export default class MovieController {

  constructor(container, movie, onDataChange) {
    this._container = container;
    this._card = null;
    this._popup = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._body = document.querySelector(`body`);
    this._commentsModel = null;
    this._commentsComponent = null;
  }

  render(movie) {
    const oldCardController = this._card;
    const oldPopupController = this._popup;

    this._card = new CardComponent(movie);
    this._popup = new DetailsComponent(movie);
    this._emotion = null;

    const commentsData = movie.comments;
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(commentsData);
    this._comments = this._commentsModel.getComments();

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

        const commentsComponent = new CommentsComponent(this._comments, this._emotion);
        const commentsController = new CommentsController(this._comments);
        const commentsBox = document.querySelector(`.form-details__bottom-container`);
        commentsController.renderComments(commentsBox, this._comments);

        setPopupHandlers();
      }

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

  destroy() {
    remove(this._popup);
    remove(this._card);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

};
