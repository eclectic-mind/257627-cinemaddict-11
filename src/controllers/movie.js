import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class MovieController {

  constructor(container, movie, onDataChange) {
    this._movie = movie;
    this._container = container;
    this._card = new CardComponent(movie);
    this._popup = new DetailsComponent(movie);
    this._onDataChange = onDataChange;
    this._body = document.querySelector(`body`);
  }

  render(movie) {

    // const body = this._body.getElement();
    const body = this._body;
    const card = this._card.getElement();
    const popup = this._popup.getElement();

    const picture = card.querySelector(`.film-card__poster`);
    const title = card.querySelector(`.film-card__title`);
    const comments = card.querySelector(`.film-card__comments`);
    const closeButton = popup.querySelector(`.film-details__close-btn`);

    this._card.setAddToWatchlistClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        inWatchlist: movie.inWatchlist,
      }));
    });

    this._card.setMarkAsWatchedClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: movie.isWatched,
      }));
    });

    this._card.setMarkAsFavoriteClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: movie.isFavorite,
      }));
    });

    picture.addEventListener(`click`, this._showPopup);
    title.addEventListener(`click`, this._showPopup);
    comments.addEventListener(`click`, this._showPopup);
    closeButton.addEventListener(`click`, this._closePopup);

    // card.setPopupOpener(this._showPopup);

    /*
    this._picture.setPopupOpener((evt) => {
      this._showPopup();
    });

    this._title.setPopupOpener((evt) => {
      this._showPopup();
    });

    this._comments.setPopupOpener((evt) => {
      this._showPopup();
    });

    this._closeButton.setPopupCloser((evt) => {
      this._closeButton();
    });
    */

    render(this._container, this._card, RenderPosition.BEFOREEND);
  }

  _showPopup(evt) {
    evt.preventDefault();
    render(body, this._popup, RenderPosition.BEFOREEND);
  };

  _closePopup(evt) {
    evt.preventDefault();
    this._popup.getElement().remove();
  };
/*
  setPopupOpener(handler) {
    const picture = this.querySelector(`.film-card__poster`);
    picture.addEventListener(`click`, handler);
     this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  };
*/
};
