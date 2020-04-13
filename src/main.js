import {CARDS_QUANTITY} from './components/constants.js';
import {CARDS_QUANTITY_RATINGS} from './components/constants.js';
import {render} from './components/render.js';
import {makeButton} from './components/button.js';
import {makeUserRank} from './components/rank.js';
import {makeCard} from './components/card.js';
import {makeSort} from './components/sort.js';
import {makeFilms} from './components/films.js';
import {makeFilmsContent} from './components/films.js';
import {makeMenu} from './components/menu.js';
import {makeDetails} from './components/details.js';
import {makeStats} from './components/stats.js';
import {makeTopFilmsContent} from './components/top.js';
import {makeMostFilmsContent} from './components/most.js';

import {generateMovie, generateMovies} from "./mock/data.js";

const userRank = makeUserRank();
const menu = makeMenu();

const button = makeButton();
// const details = makeDetails();
const sort = makeSort();
const stats = makeStats();
const films = makeFilms();
const filmsContent = makeFilmsContent();
// const filmsTopContent = makeTopFilmsContent();
// const filmsMostContent = makeMostFilmsContent();

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);
const cards = movies.map(item => makeCard(item));

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

render(header, userRank, `beforeend`);
render(statsContainer, stats, `afterbegin`);
render(pageMain, menu, `afterbegin`);
render(pageMain, sort, `beforeend`);
render(pageMain, films, `beforeend`);

const filmsDiv = document.querySelector(`.films`);

render(filmsDiv, filmsContent, `afterbegin`);
// render(filmsDiv, filmsTopContent, `beforeend`);
// render(filmsDiv, filmsMostContent, `beforeend`);

const filmsContainer = document.querySelectorAll(`.films-list__container`)[0];
for (let i = 0; i < CARDS_QUANTITY; i += 1) {
  render(filmsContainer, cards, `afterbegin`);
}
render(filmsContainer, button, `afterend`);

/* const filmsTopContainer = document.querySelectorAll(`.films-list__container`)[1];
for (let i = 0; i < CARDS_QUANTITY_RATINGS; i += 1) {
  render(filmsTopContainer, cards, `beforeend`);
}
const filmsMostContainer = document.querySelectorAll(`.films-list__container`)[2];
for (let i = 0; i < CARDS_QUANTITY_RATINGS; i += 1) {
  render(filmsMostContainer, cards, `beforeend`);
} */

// render(pageMain, details, `afterend`);
