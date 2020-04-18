export const generateFilters = (items) => {
  const allCount = items.length;
  const watchlistCount = items.filter((item) => !!item.inWatchlist).length;
  const historyCount = items.filter((item) => !!item.inHistory).length;
  const favoritesCount = items.filter((item) => !!item.inFavorites).length;

  return [
    {title: `All`, count: allCount},
    {title: `Watchlist`, count: watchlistCount},
    {title: `History`, count: historyCount},
    {title: `Favorites`, count: favoritesCount}
  ];
};
