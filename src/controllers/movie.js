import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class MovieController {

  constructor(container, movie) {
    this._movie = movie;
    this._container = container;
    this._card = new CardComponent(movie);
    this._popup = new DetailsComponent(movie);
    this._body = document.querySelector(`body`);
  }

  render(movie) {

    const card = this._card.getElement();
    const popup = this._popup.getElement();

    const picture = card.querySelector(`.film-card__poster`);
    const title = card.querySelector(`.film-card__title`);
    const comments = card.querySelector(`.film-card__comments`);
    const closeButton = popup.querySelector(`.film-details__close-btn`);

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
    render(this._body, this._popup, RenderPosition.BEFOREEND);
  };

  _closePopup(evt) {
    evt.preventDefault();
    this._popup.getElement().remove();
  };

};
