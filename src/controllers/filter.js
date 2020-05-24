import MenuComponent from "../components/menu.js";
import {FilterType} from "../constants.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {doFiltration, generateFilters} from "../utils/common.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilterType = FilterType.ALL;
    this._menu = null;
    this.render = this.render.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setDataChangeHandler(this.render);
    this._moviesModel.setFilterChangeHandler(this.render);
  }

  render() {
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        title: filterType,
        count: doFiltration(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._menu;
    this._menu = new MenuComponent(filters);
    this._menu.setFilterChangeHandler(this._onFilterChange);
    // this._menu.setToggleMode(this._toggleModehandler);

    if (oldComponent) {
      replace(this._menu, oldComponent);
    } else {
      render(this._container, this._menu, RenderPosition.AFTERBEGIN);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilter(filterType);
    // this._menu.setToggleMode(this._toggleModehandler);
  }

  _onDataChange() {
    this.render();
  }

}
