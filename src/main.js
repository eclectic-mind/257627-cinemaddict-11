import {CARDS_QUANTITY, CARDS_QUANTITY_ON_START, CARDS_QUANTITY_RATINGS, CARDS_QUANTITY_MORE, SUBTITLES, Mode} from './constants.js';
import {generateMovie, generateMovies, generateCommentsArray} from './mock/data.js';
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from "./models/movies.js";
import FilterController from './controllers/filter.js';
import StatsComponent from './components/footer-stats.js';
import ChartsComponent from './components/charts.js';
import RankComponent from './components/header-rank.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const moviesData = generateMovie();
const movies = generateMovies(CARDS_QUANTITY);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const userRank = new RankComponent(movies);
const stats = new StatsComponent(movies);
render(header, userRank, RenderPosition.BEFOREEND);
render(statsContainer, stats, RenderPosition.AFTERBEGIN);

const board = new BoardComponent();
const boardController = new BoardController(board, moviesModel);

render(pageMain, board, RenderPosition.BEFOREEND);
boardController.render(movies);

const menu = new FilterController(pageMain, moviesModel);
menu.render();

const charts = new ChartsComponent(movies);
render(pageMain, charts, RenderPosition.BEFOREEND);

/* menu.setToggleMode((value) => {
  if (value === Mode.BOARD) {
    boardController.show();
    charts.hide();
  }
  if (value === Mode.CHARTS) {
    boardController.hide();
    charts.show();
  }
});
*/
