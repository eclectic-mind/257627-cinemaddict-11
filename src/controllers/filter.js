import MenuComponent from "../components/menu.js";
import {FilterType} from "../constants.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getMoviesByFilter} from "../utils/common.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._pageMain = document.querySelector(`main`);
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._menu = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._menu;

    this._menu = new MenuComponent(filters);
    this._menu.setFilterChangeHandler(this._onFilterChange);
    console.log(`выбран фильтр` + filterType);

    if (oldComponent) {
      replace(this._menu, oldComponent);
    } else {
      render(this._pageMain, this._menu, RenderPosition.BEFOREEND);
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
