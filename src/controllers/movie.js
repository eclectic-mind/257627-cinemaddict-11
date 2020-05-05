import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

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

    this._card.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      console.log(`добавили в список!`);
      this._onDataChange(this, movie, Object.assign({}, movie, {
        inWatchlist: movie.inWatchlist,
      }));
    });

    this._card.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      console.log(`просмотрено!`);
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: movie.isWatched,
      }));
    });

    this._card.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      console.log(`fav!`);
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: movie.isFavorite,
      }));
    });

    this._card.setPopupOpenerClickHandler((evt) => {
      evt.preventDefault();
      render(body, this._popup, RenderPosition.BEFOREEND);
    });

    this._popup.setPopupCloserClickHandler((evt) => {
      evt.preventDefault();
      remove(this._popup.getElement());
    });

    render(this._container, this._card, RenderPosition.BEFOREEND);
  }

};
