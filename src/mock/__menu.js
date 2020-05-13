import {getInWatchlist, getWatched, getFavorites} from '../utils/common.js';

export const generateFilters = (items) => {
  const allCount = items.length;
  const watchlistCount = getInWatchlist(items).length;
  const historyCount = getWatched(items).length;
  const favoritesCount = getFavorites(items).length;

  return [
    {title: `All`, count: allCount},
    {title: `Watchlist`, count: watchlistCount},
    {title: `History`, count: historyCount},
    {title: `Favorites`, count: favoritesCount}
  ];
};
