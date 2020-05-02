import CardComponent from "../components/card.js";
import DetailsComponent from "../components/details.js";
import {render, replace, RenderPosition} from "../utils/render.js";

/* const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};
*/

export default class MovieController {
  /*
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._taskComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._formComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldFormComponent = this._formComponent;
    this._taskComponent = new TaskComponent(task);
    this._formComponent = new FormComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._formComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceFormToTask();
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);

    if (oldFormComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._formComponent, oldFormComponent);
    } else {
      render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTask();
    }
  }

  _replaceFormToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._formComponent.reset();
    replace(this._taskComponent, this._formComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToForm() {
    this._onViewChange();
    replace(this._formComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  */
}
