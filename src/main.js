import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, SUBTITLES} from './constants.js';
import {generateMovie, generateMovies} from './mock/data.js';
import {generateFilters} from './mock/menu.js';
import {render, replace, remove, RenderPosition} from './utils/render.js';
import {doSorting} from './utils/common.js';

import StatsComponent from './components/stats.js';
import RankComponent from './components/rank.js';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const userRank = new RankComponent();
const stats = new StatsComponent();
render(header, userRank, RenderPosition.BEFOREEND);
render(statsContainer, stats, RenderPosition.AFTERBEGIN);

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);

const filters = generateFilters(movies);

const menu = new MenuComponent(filters);
render(pageMain, menu, RenderPosition.AFTERBEGIN);

const board = new BoardComponent();
const boardController = new BoardController(board);

render(pageMain, board, RenderPosition.BEFOREEND);
boardController.render(movies);
