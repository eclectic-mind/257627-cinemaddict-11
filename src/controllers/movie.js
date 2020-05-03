import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class MovieController {

  constructor(container, movie) {
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

/*
export default class TaskController {

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);
    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
*/
