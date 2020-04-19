import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, STATS_ALL} from './components/constants.js';
import {render} from './components/render.js';
import {makeButton} from './components/button.js';
import {makeUserRank} from './components/rank.js';
import {makeCard} from './components/card.js';
import {makeSortMarkup, doSorting} from './components/sort.js';
import {makeFilms} from './components/films.js';
import {makeFilmsContent} from './components/films.js';
import {makeMenuMarkup} from './components/menu.js';
import {makeDetails} from './components/details.js';
import {makeStats} from './components/stats.js';
import {makeTopFilmsContent} from './components/top.js';
import {makeMostFilmsContent} from './components/most.js';
import {generateMovie, generateMovies} from './mock/data.js';
import {generateFilters} from './mock/menu.js';

const userRank = makeUserRank();
const button = makeButton();

const stats = makeStats();
const films = makeFilms();
const filmsContent = makeFilmsContent();
const filmsTopContent = makeTopFilmsContent();
const filmsMostContent = makeMostFilmsContent();
const sort = makeSortMarkup();

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);
const moviesSorted = doSorting(movies, `date`);
const moviesTopRated = doSorting(movies, `rated`).slice(0, CARDS_QUANTITY_RATINGS);
const moviesMostComment = doSorting(movies, `comments`).slice(0, CARDS_QUANTITY_RATINGS);

const cards = moviesSorted.map(item => makeCard(item));
const cardsTopRated = moviesTopRated.map(item => makeCard(item));
const cardsMostComment = moviesMostComment.map(item => makeCard(item));

const details = makeDetails(moviesSorted[0]);

render(header, userRank, `beforeend`);
render(statsContainer, stats, `afterbegin`);

render(pageMain, sort, `beforeend`);
render(pageMain, films, `beforeend`);

const filters = generateFilters(moviesSorted);
const menu = makeMenuMarkup(filters);
render(pageMain, menu, `afterbegin`);

const filmsDiv = document.querySelector(`.films`);

render(filmsDiv, filmsContent, `afterbegin`);
render(filmsDiv, filmsTopContent, `beforeend`);
render(filmsDiv, filmsMostContent, `beforeend`);

const filmsContainer = document.querySelectorAll(`.films-list__container`)[0];

let showingMoviesCount = CARDS_QUANTITY_ON_START;
cards.slice(0, showingMoviesCount).forEach((item) => render(filmsContainer, item, `afterbegin`));

if (cards.length > CARDS_QUANTITY_ON_START) {
  render(filmsContainer, button, `afterend`);
}

const buttonMore = document.querySelector(`.films-list__show-more`);
  if (buttonMore) {
    buttonMore.addEventListener(`click`, () => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount += CARDS_QUANTITY_MORE;
      cards.slice(prevMoviesCount, showingMoviesCount).forEach((cards) => render(filmsContainer, cards, `beforeend`));

      if (showingMoviesCount >= cards.length) {
        buttonMore.remove();
      }
  });
};

const filmsTopContainer = document.querySelectorAll(`.films-list__container`)[1];
render(filmsTopContainer, cardsTopRated.join(``), `beforeend`);

const filmsMostContainer = document.querySelectorAll(`.films-list__container`)[2];
render(filmsMostContainer, cardsMostComment.join(``), `beforeend`);

render(pageMain, details, `afterend`);
