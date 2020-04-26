import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from '../constants.js';
import {doSorting} from '../utils/common.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';

import LoadMoreButtonComponent from '../components/button.js';
import FilmsContainerComponent from '../components/films.js';
import SortingComponent from '../components/sort.js';
import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details.js';
import SpecialFilmsComponent from '../components/special.js';
import NoFilmsComponent from '../components/no-films.js';

const body = document.querySelector(`body`);

const renderFilm = (container, movie) => {
  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const picture = card.getElement().querySelector(`.film-card__poster`);
  const title = card.getElement().querySelector(`.film-card__title`);
  const comments = card.getElement().querySelector(`.film-card__comments`);
  const closeButton = popup.getElement().querySelector(`.film-details__close-btn`);
/*
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      popup.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  */

  const showPopup = (evt) => {
    evt.preventDefault();
    render(body, popup, RenderPosition.BEFOREEND);
  };

  const closePopup = (evt) => {
    evt.preventDefault();
    popup.getElement().remove();
    // document.removeEventListener(`keydown`, onEscKeyDown);
  };

  picture.addEventListener(`click`, showPopup);
  title.addEventListener(`click`, showPopup);
  comments.addEventListener(`click`, showPopup);
  closeButton.addEventListener(`click`, closePopup);

  render(container, card, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsListContainer, items) => {
  items.forEach((item) => {
    renderFilm(filmsListContainer, item);
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noFilms = new NoFilmsComponent();
    this._sorting = new SortingComponent();
    this._films = new FilmsContainerComponent();
    this._button = new LoadMoreButtonComponent();
    this._card = new CardComponent();
    this._details = new DetailsComponent();
    this._top = new SpecialFilmsComponent(SUBTITLES[0]);
    this._most = new SpecialFilmsComponent(SUBTITLES[1]);
  }

  render(movies) {

    const renderButton = (filmsBox, filmsList) => {
      let showingMoviesCount = CARDS_QUANTITY_ON_START;
      if (movies.length > showingMoviesCount) {
        render(filmsList, this._button, RenderPosition.BEFOREEND);
      }

      if (this._button) {
        this._button.setClickHandler(() => {
          const prevMoviesCount = showingMoviesCount;
          showingMoviesCount += CARDS_QUANTITY_MORE;
          movies.slice(prevMoviesCount, showingMoviesCount).forEach(item => renderFilm(filmsBox, item));

          if (showingMoviesCount >= movies.length) {
            remove(this._button.getElement());
          }

        });
      }
    };

    const container = this._container.getElement();
    const list = container.querySelector(`.films-list`);

    if (movies.length === 0) {
      const allFilmsTitle = list.querySelector(`h2`);
      remove(allFilmsTitle);
      render(list, this._noFilms, RenderPosition.AFTERBEGIN);
      return;
    }

    if (movies.length > 0) {

      render(list, this._films, RenderPosition.BEFOREEND);
      const box = list.querySelector(`.films-list__container`);
      render(container, this._top, RenderPosition.BEFOREEND);
      render(container, this._most, RenderPosition.BEFOREEND);
      const boxTop = this._top.getElement().querySelector(`.films-list__container`);
      const boxMost = this._most.getElement().querySelector(`.films-list__container`);
      movies.slice(0, CARDS_QUANTITY_ON_START).forEach(item => renderFilm(box, item));
      renderButton(box, list);
      movies.slice(0, CARDS_QUANTITY_RATINGS).forEach(item => renderFilm(boxTop, item));
      movies.slice(0, CARDS_QUANTITY_RATINGS).forEach(item => renderFilm(boxMost, item));
    }

  }
}
