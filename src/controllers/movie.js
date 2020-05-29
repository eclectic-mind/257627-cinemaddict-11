import {render, replace, remove, RenderPosition} from '../utils/render.js';
import CommentsComponent from '../components/comments.js';
import CommentsModel from '../models/comments.js';
import CommentModel from '../models/comment.js';
import CommentsController from '../controllers/comments.js';
import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details.js';
import MovieModel from '../models/movie.js';
import API from '../api.js';

const parseFormData = (formData) => {
  return new MovieModel({
    "comments": formData.get(`comments`),
    "user_details": {
      "watchlist": false,
      "already_watched": false,
      "watching_date": formData.get(`watchingDate`),
      "favorite": false
    }
  });
};

export default class MovieController {

  constructor(container, movie, api, onDataChange) {
    this._container = container;
    this._card = null;
    this._popup = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._body = document.querySelector(`body`);
    this._commentsModel = null;
    this._commentsComponent = null;
    this._commentsController = null;
    this._api = api;
  }

  render(movie) {
    const oldCardController = this._card;
    this._card = new CardComponent(movie);
    this._emotion = null;
    const body = this._body;
    const card = this._card.getElement();

    const onCommentsUpdate = (comments) => {
      const newMovie = MovieModel.clone(movie);
      newMovie.comments = comments;
      this._onDataChange(this, movie, newMovie);
    }

    const setPopupHandlers = () => {
      this._popup.setPopupCloserClickHandler((evt) => {
        evt.preventDefault();
        remove(this._popup);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._popup = null;
      });

      this._popup.setAddToWatchlistClickHandler((evt) => {
        const newMovie = MovieModel.clone(movie);
        newMovie.inWatchlist = !newMovie.inWatchlist;
        this._onDataChange(this, movie, newMovie);
      });

      this._popup.setMarkAsWatchedClickHandler((evt) => {
        const newMovie = MovieModel.clone(movie);
        newMovie.isWatched = !newMovie.isWatched;
        newMovie.watchingDate = new Date();
        this._onDataChange(this, movie, newMovie);
      });

      this._popup.setMarkAsFavoriteClickHandler((evt) => {
        const newMovie = MovieModel.clone(movie);
        newMovie.isFavorite = !newMovie.isFavorite;
        this._onDataChange(this, movie, newMovie);
      });

    };

    this._card.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.inWatchlist = !newMovie.inWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._card.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      newMovie.watchingDate = new Date();
      this._onDataChange(this, movie, newMovie);
    });

    this._card.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, movie, newMovie);
    });

    this._card.setPopupOpenerClickHandler((evt) => {
      evt.preventDefault();
      this._popup = new DetailsComponent(movie);
      const popup = this._popup.getElement();
      document.addEventListener(`keydown`, this._onEscKeyDown);

      if (!body.querySelector(`.film-details`)) {
        this._api.getComments(movie.id)
        .then((comments) => {
          if (!this._commentsModel) {
            this._commentsModel = new CommentsModel();
            this._commentsModel.setComments(CommentModel.parseComments(comments));
            this._comments = this._commentsModel.getComments();
          }

          render(body, this._popup, RenderPosition.BEFOREEND);

          if (!this._commentsController) {
            this._commentsController = new CommentsController(this._commentsModel, onCommentsUpdate, movie.id, this._api);
          }

          const commentsBox = document.querySelector(`.form-details__bottom-container`);
          this._commentsController.renderComments(commentsBox);
          setPopupHandlers();
        });
      }

    });

    if (oldCardController) {
      replace(this._card, oldCardController);
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
    if (this._popup) {
      remove(this._popup);
    }
    remove(this._card);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

}
