import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from './constants.js';
import {generateMovie, generateMovies} from './mock/data.js';
import {generateFilters} from './mock/menu.js';
import {render, replace, remove, RenderPosition} from './utils/render.js';
import {doSorting} from './utils/common.js';

import StatsComponent from './components/stats.js';
import RankComponent from './components/rank.js';
import MenuComponent from './components/menu.js';
import FilmsContainerComponent from './components/films.js';
import SpecialFilmsComponent from './components/special.js';
import BoardComponent from './components/board.js';
import NoFilmsComponent from './components/no-films.js';

import {renderS, RenderPositionS} from './components/render.js'; // old


import LoadMoreButtonComponent from './components/button.js';
import SortingComponent from './components/sort.js';
import CardComponent from './components/card.js';
import DetailsComponent from './components/details.js';


const userRank = new RankComponent();
const stats = new StatsComponent();
const board = new BoardComponent();
const films = new FilmsContainerComponent();
const top = new SpecialFilmsComponent(SUBTITLES[0]);
const most = new SpecialFilmsComponent(SUBTITLES[1]);

const sort = new SortingComponent();

const button = new LoadMoreButtonComponent();
const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);

const moviesSorted = doSorting(movies, `date`);
const moviesTopRated = doSorting(movies, `rating`, 0, CARDS_QUANTITY_RATINGS);
const moviesMostComment = doSorting(movies, `comments`, 0, CARDS_QUANTITY_RATINGS);

const renderFilm = (container, movie) => {
  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const closePopup = () => {
    pageMain.removeChild(popup.getElement());
  };
  const showPopup = (movie) => {
    renderS(pageMain, popup.getElement(), RenderPositionS.BEFOREEND);
  };

  const picture = card.getElement().querySelector(`.film-card__poster`);
  picture.addEventListener(`click`, showPopup);

  const title = card.getElement().querySelector(`.film-card__title`);
  title.addEventListener(`click`, showPopup);

  const comments = card.getElement().querySelector(`.film-card__comments`);
  comments.addEventListener(`click`, showPopup);

  const closeButton = popup.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, closePopup);

  renderS(container, card.getElement(), RenderPositionS.BEFOREEND);
};

renderS(header, userRank.getElement(), RenderPositionS.BEFOREEND);
renderS(statsContainer, stats.getElement(), RenderPositionS.AFTERBEGIN);
renderS(pageMain, sort.getElement(), RenderPositionS.BEFOREEND);

const filters = generateFilters(moviesSorted);
const menu = new MenuComponent(filters);

renderS(pageMain, menu.getElement(), RenderPositionS.AFTERBEGIN);
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
