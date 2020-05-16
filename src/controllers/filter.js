import MenuComponent from "../components/menu.js";
import {FilterType} from "../constants.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {doFiltration, generateFilters} from "../utils/common.js";
// import MoviesModel from "../models/movies.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._pageMain = document.querySelector(`main`);
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilterType = FilterType.ALL;
    // this._menu = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    // this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    // const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    // const filters = generateFilters(allMovies);
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: doFiltration(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    console.log(filters);

    const menu = new MenuComponent(filters);
    menu.setFilterChangeHandler(this._onFilterChange);

    console.log(menu);

    const oldComponent = menu;

    // this._menu = new MenuComponent(filters);

    // console.log(`выбран фильтр` + filterType);

    if (oldComponent) {
      replace(menu, oldComponent);
    } else {
      render(this._pageMain, menu, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
