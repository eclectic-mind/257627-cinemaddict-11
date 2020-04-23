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

const cards = moviesSorted.map(item => new CardComponent(item));
const cardsTopRated = moviesTopRated.map(item => new CardComponent(item));
const cardsMostComment = moviesMostComment.map(item => new CardComponent(item));

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
cards.slice(0, showingMoviesCount).forEach(item => render(films.getElement(), item.getElement(), RenderPosition.BEFOREEND));

if (cards.length > CARDS_QUANTITY_ON_START) {
  render(filmsList.getElement(), button.getElement(), RenderPosition.BEFOREEND);
}

if (button.getElement()) {
    button.getElement().addEventListener(`click`, () => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount += CARDS_QUANTITY_MORE;
      cards.slice(prevMoviesCount, showingMoviesCount).forEach(item => render(films.getElement(), item.getElement(), RenderPosition.BEFOREEND));

      if (showingMoviesCount >= cards.length) {
        button.getElement().remove();
        button.removeElement();
      }
  });
};

// const filmsTopContainer = document.querySelectorAll(`.films-list__container`)[1];
cardsTopRated.forEach(item => render(top.getElement(), item.getElement(), RenderPosition.BEFOREEND));
// render(top.getElement(), cardsTopRated.getElement(), RenderPosition.BEFOREEND);

cardsMostComment.forEach(item => render(most.getElement(), item.getElement(), RenderPosition.BEFOREEND));
// const filmsMostContainer = document.querySelectorAll(`.films-list__container`)[2];
// render(filmsMostContainer, cardsMostComment.join(``), `beforeend`);

const closePopup = () => {
  pageMain.removeChild(details.getElement());
  return;
};

const details = new DetailsComponent(moviesSorted[0]);
render(pageMain, details.getElement(), RenderPosition.BEFOREEND);
let closeButton = document.querySelector(`.film-details__close-btn`);
closeButton.addEventListener(`click`, closePopup);
