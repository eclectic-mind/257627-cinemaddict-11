import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL, SUBTITLES} from './constants.js';
import {render, RenderPosition} from './components/render.js';
import {doSorting} from './utils.js';
import {generateMovie, generateMovies} from './mock/data.js';
import {generateFilters} from './mock/menu.js';

import LoadMoreButtonComponent from './components/button.js';
import StatsComponent from './components/stats.js';
import RankComponent from './components/rank.js';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import FilmsListComponent from './components/list.js';
import FilmsContainerComponent from './components/films.js';
import SortingComponent from './components/sort.js';
import CardComponent from './components/card.js';
import DetailsComponent from './components/details.js';
import SpecialFilmsComponent from './components/special.js';

const userRank = new RankComponent();
const button = new LoadMoreButtonComponent();
const stats = new StatsComponent();
const board = new BoardComponent();
const filmsList = new FilmsListComponent();
const films = new FilmsContainerComponent();
const sort = new SortingComponent();
const top = new SpecialFilmsComponent(SUBTITLES[0]);
const most = new SpecialFilmsComponent(SUBTITLES[1]);

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);

const moviesSorted = doSorting(movies.slice(0), `date`);
const moviesTopRated = doSorting(movies.slice(0), `rating`).slice(0, CARDS_QUANTITY_RATINGS);
const moviesMostComment = doSorting(movies.slice(0), `comments`).slice(0, CARDS_QUANTITY_RATINGS);

const renderFilm = (container, movie) => {
  const card = new CardComponent(movie);
  const popup = new DetailsComponent(movie);

  const closePopup = () => {
    pageMain.removeChild(popup.getElement());
  };
  const showPopup = (movie) => {
    render(pageMain, popup.getElement(), RenderPosition.BEFOREEND);
  };

  const picture = card.getElement().querySelector(`.film-card__poster`);
  picture.addEventListener(`click`, showPopup);

  const title = card.getElement().querySelector(`.film-card__title`);
  title.addEventListener(`click`, showPopup);

  const comments = card.getElement().querySelector(`.film-card__comments`);
  comments.addEventListener(`click`, showPopup);

  const closeButton = popup.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, closePopup);

  render(container, card.getElement(), RenderPosition.BEFOREEND);
};

render(header, userRank.getElement(), RenderPosition.BEFOREEND);
render(statsContainer, stats.getElement(), RenderPosition.AFTERBEGIN);
render(pageMain, sort.getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(moviesSorted);
const menu = new MenuComponent(filters);

render(pageMain, menu.getElement(), RenderPosition.AFTERBEGIN);
render(pageMain, board.getElement(), RenderPosition.BEFOREEND);
render(board.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);
render(filmsList.getElement(), films.getElement(), RenderPosition.AFTERBEGIN);
render(board.getElement(), top.getElement(), RenderPosition.BEFOREEND);
render(board.getElement(), most.getElement(), RenderPosition.BEFOREEND);

let showingMoviesCount = CARDS_QUANTITY_ON_START;
moviesSorted.slice(0, showingMoviesCount).forEach(item => renderFilm(films.getElement(), item));

if (moviesSorted.length > CARDS_QUANTITY_ON_START) {
  render(filmsList.getElement(), button.getElement(), RenderPosition.BEFOREEND);
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
