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

    const renderButton = () => {
      let showingMoviesCount = CARDS_QUANTITY_ON_START;
      if (movies.length > showingMoviesCount) {
        render(container, this._button, RenderPosition.BEFOREEND);
      }

      if (this._button) {
        this._button.setClickHandler(() => {
          const prevMoviesCount = showingMoviesCount;
          showingMoviesCount += CARDS_QUANTITY_MORE;

          movies.slice(prevMoviesCount, showingMoviesCount).forEach(item => renderFilm(container, item));

          if (showingMoviesCount >= movies.length) {
            remove(this._button);
          }

        });
      }
    };

    const container = this._container.getElement();
    const box = this._films.getElement();
    // render(container, box, RenderPosition.BEFOREEND);
    // render(container, this._films, RenderPosition.BEFOREEND);

    if (movies.length === 0) {
      render(container, this._noFilms, RenderPosition.BEFOREEND);
      return;
    }

    movies.slice(0, CARDS_QUANTITY_ON_START).forEach(item => renderFilm(container, item));
    renderButton();
  }
}

/*
renderS(pageMain, board.getElement(), RenderPositionS.BEFOREEND);

const filmsList = board.getElement().querySelector(`.films-list`);

renderS(board.getElement(), filmsList, RenderPositionS.BEFOREEND);
renderS(filmsList, films.getElement(), RenderPositionS.AFTERBEGIN);

renderS(board.getElement(), top.getElement(), RenderPositionS.BEFOREEND);
renderS(board.getElement(), most.getElement(), RenderPositionS.BEFOREEND);

let showingMoviesCount = CARDS_QUANTITY_ON_START;
moviesSorted.slice(0, showingMoviesCount).forEach(item => renderFilm(films.getElement(), item));

if (moviesSorted.length > CARDS_QUANTITY_ON_START) {
  renderS(filmsList, button.getElement(), RenderPositionS.BEFOREEND);
}

if (button.getElement()) {
    button.getElement().addEventListener(`click`, () => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount += CARDS_QUANTITY_MORE;
      moviesSorted.slice(prevMoviesCount, showingMoviesCount).forEach(item => renderFilm(films.getElement(), item));

      if (showingMoviesCount >= moviesSorted.length) {
        button.getElement().remove();
        button.removeElement();
      }
  });
};

const topContainer = top.getElement().querySelector(`.films-list__container`);
moviesTopRated.forEach(item => renderFilm(topContainer, item));

const mostContainer = most.getElement().querySelector(`.films-list__container`);
moviesMostComment.forEach(item => renderFilm(mostContainer, item));
*/
