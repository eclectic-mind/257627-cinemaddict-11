import API from './api.js';
import {modeSwitcher} from './utils/common.js';
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter.js';
import StatsComponent from './components/footer-stats.js';
import ChartsComponent from './components/charts.js';
import RankComponent from './components/header-rank.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';

const AUTHORIZATION = `Basic kjdf8975jkdfhkd84745fg`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const pageMain = document.querySelector(`main`);
const header = document.querySelector(`header`);
const statsContainer = document.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const menu = new FilterController(pageMain, moviesModel);
menu.render();

const board = new BoardComponent();
const boardController = new BoardController(board, moviesModel, api);

render(pageMain, board, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);

    boardController.render();

    const charts = new ChartsComponent(moviesModel);
    render(pageMain, charts, RenderPosition.BEFOREEND);
    moviesModel.setDataChangeHandler(charts.rerender);
    modeSwitcher(`board`);

    const userRank = new RankComponent(moviesModel);
    moviesModel.setDataChangeHandler(userRank.rerender);
    render(header, userRank, RenderPosition.BEFOREEND);

    const stats = new StatsComponent(moviesModel);
    render(statsContainer, stats, RenderPosition.AFTERBEGIN);
  });
