import {render, replace, remove, RenderPosition} from "../utils/render.js";
import CommentsComponent from "../components/comments.js";
import CommentsModel from "../models/comments.js";
import CommentsController from "../controllers/comments.js";
import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
// import {generateComment, generateCommentsArray} from '../mock/data.js';

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

  constructor(container, movie, onDataChange) {
    this._container = container;
    this._card = null;
    this._popup = null;
    this._onDataChange = onDataChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._body = document.querySelector(`body`);
    this._commentsModel = null;
    this._commentsComponent = null;
    this._commentsController = null;
  }

  render(movie) {
    const oldCardController = this._card;
    // временный массив комментов
    // const commentsArray = movie.comments.map((id) => generateComment(id));
    //

    this._card = new CardComponent(movie);
    this._emotion = null;

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();
      // this._commentsModel.setComments(commentsArray);
      this._comments = this._commentsModel.getComments();
    }

    const body = this._body;
    const card = this._card.getElement();

    const onCommentsUpdate = (comments) => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        comments: comments
      }));
    }

    const setPopupHandlers = () => {
      this._popup.setPopupCloserClickHandler((evt) => {
        evt.preventDefault();
        remove(this._popup);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._popup = null;
      });

      this._popup.setAddToWatchlistClickHandler((evt) => {
        // this._onDataChange(this, movie, Object.assign({}, movie, {
        //   inWatchlist: !movie.inWatchlist,
        // }));
        const newMovie = MovieModel.clone(movie);
        newMovie.inWatchlist = !newMovie.inWatchlist;
        this._onDataChange(this, movie, newMovie);
      });

      this._popup.setMarkAsWatchedClickHandler((evt) => {
        // this._onDataChange(this, movie, Object.assign({}, movie, {
        //  isWatched: !movie.isWatched,
        //  watchingDate: new Date()
        // }));
        const newMovie = MovieModel.clone(movie);
        newMovie.isWatched = !newMovie.isWatched;
        newMovie.watchingDate = new Date();
        this._onDataChange(this, movie, newMovie);
      });

      this._popup.setMarkAsFavoriteClickHandler((evt) => {
        // this._onDataChange(this, movie, Object.assign({}, movie, {
        //   isFavorite: !movie.isFavorite,
        // }));
        const newMovie = MovieModel.clone(movie);
        newMovie.isFavorite = !newMovie.isFavorite;
        this._onDataChange(this, movie, newMovie);
      });

    };

    this._card.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      // this._onDataChange(this, movie, Object.assign({}, movie, {
      //   inWatchlist: !movie.inWatchlist,
      // }));
      const newMovie = MovieModel.clone(movie);
      newMovie.inWatchlist = !newMovie.inWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._card.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      // this._onDataChange(this, movie, Object.assign({}, movie, {
      //  isWatched: !movie.isWatched,
      //   watchingDate: new Date()
      // }));
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      newMovie.watchingDate = new Date();
      this._onDataChange(this, movie, newMovie);
      // console.log(movie.watchingDate);
    });

    this._card.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      // this._onDataChange(this, movie, Object.assign({}, movie, {
      //   isFavorite: !movie.isFavorite,
      // }));
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
        render(body, this._popup, RenderPosition.BEFOREEND);

        if (!this._commentsController) {
          this._commentsController = new CommentsController(this._commentsModel, onCommentsUpdate);
        }

        const commentsBox = document.querySelector(`.form-details__bottom-container`);
        this._commentsController.renderComments(commentsBox);

        setPopupHandlers();
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

};
