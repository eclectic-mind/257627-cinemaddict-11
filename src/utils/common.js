import {FilterType, USER_RANKS, Mode} from "../constants.js";
import moment from "moment";

export const getRandomNumber = (min = 0, max = 1000) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomFloat = (min, max) => {
  let number = Math.random() * (max - min) + min;
  return number.toFixed(1);
};

export const getRandomTime = () => {
  const start = new Date("January 01 1900");
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomCommentTime = () => {
  const start = new Date("January 2018 00:00");
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

export const getSomeItems = (min, max, array) => {
  const length = getRandomNumber(min, max);
  const count = array.length - 1;
  let result = [];
  for (let i = 0; i < length; i += 1) {
    let j = getRandomNumber(0, count);
    result.push(array[j]);
  }
  return result;
};

export const createFishText = (min, max, array) => {
  const length = getRandomNumber(min, max);
  const count = array.length - 1;
  let result = [];
  for (let i = 0; i < length; i += 1) {
    let j = getRandomNumber(0, count);
    result.push(array[j]);
  }
  return result.join(` `);
};

export const cutText = (text, max) => {
  let result = text.split(``).slice(0, max).join(``);
  return `${result}...`;
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateForComment = (date) => {
  const now = moment();
  let result = ``;

  const startMinutes = 60;
  const startHours = 60 * 60;
  const startToday = startHours * 12;
  const startDays = startHours * 24;
  const endDays = startDays * 7;

  const differenceSec = Math.round(moment.duration(now.diff(date)).asSeconds());
  const differenceHour = Math.round(moment.duration(now.diff(date)).asHours());
  const differenceDay = Math.round(moment.duration(now.diff(date)).asDays());

  if (differenceSec <= startMinutes) {
    result = `Now`;
  }
  else if (differenceSec <= startHours) {
    result = `A few minutes ago`;
  }
  else if (differenceSec <= startToday && differenceHour === 1) {
    result = `${differenceHour} hour ago`;
  }
  else if (differenceSec <= startToday) {
    result = `${differenceHour} hours ago`;
  }
  else if (differenceSec > startToday && differenceSec <= startDays) {
    result = `Today`;
  }
  else if (differenceSec > startDays && differenceDay === 1) {
    result = `Yesterday`;
  }
  else if (differenceSec > startDays && differenceSec <= endDays) {
    result = `${differenceDay} days ago`;
  }
  else if (differenceSec > endDays) {
    result = moment(date).format(`YYYY/MM/DD HH:mm`)
  }
  return result;
};

export const formatDuration = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const text = hours != 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  return text;
};

export const formatDurationStats = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const text = hours != 0 ? `${hours} <span class="statistic__item-description">h</span> ${minutes}<span class="statistic__item-description">m</span>`
  : `0 <span class="statistic__item-description">h</span> ${minutes}<span class="statistic__item-description">m</span>`;
  return text;
};

export const getOnlyYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const makeMenuLink = (name) => {
  let array = name.split(` `);
  let className = array[0].toLowerCase();
  return className;
};

export const makeControlLink = (name) => {
  let array = name.split(` `);
  return name === `Add to watchlist` ? `add-to-watchlist` : name === `Mark as watched` ? `mark-as-watched` : `favorite`;
};

export const makeControlLinkPopup = (name) => {
  let array = name.split(` `);
  return name === `Add to favorites` ? `favorite` : array[array.length - 1].toLowerCase();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

export const doSorting = (data, param, from = 0, to = data.length) => {
  let sorted = [];
  let copy = data.slice();
  switch (param) {
    case `date`:
      sorted = copy.sort((prev, next) => next.date - prev.date);
      break;
    case `rating`:
      sorted = copy.sort((prev, next) => next.rating - prev.rating);
      break;
    case `comments`:
      sorted = copy.sort((prev, next) => next.comments.length - prev.comments.length);
      break;
    case `default`:
      sorted = copy;
      break;
    default:
      sorted = copy;
  }
  return sorted.slice(from, to);
};

// filtration

export const getInWatchlist = (items) => {
  return items.filter((item) => !!item.inWatchlist)
};

export const getWatched = (items) => {
  return items.filter((item) => !!item.isWatched);
};

export const getFavorites = (items) => {
  return items.filter((item) => !!item.isFavorite);
};

export const doFiltration = (data, param) => {
  let copy = data.slice();
  switch (param) {
    case `Watchlist`:
      return getInWatchlist(copy);
    case `History`:
      return getWatched(copy);
    case `Favorites`:
      return getFavorites(copy);
    case `All`:
      return copy;
    default:
      return copy;
 }
};

export const countAllMovies = (movies) => {
  return movies.length;
};

export const getTotalDuration = (movies) => {
  const watched = getWatched(movies);
  const time = watched.reduce((prev, next) => {
    return (prev += next.duration);
  }, 0);
  const result = formatDurationStats(time);
  return result;
};

export const getWatchedGenres = (movies) => {
  const watched = getWatched(movies);
  let allGenres = [];
  watched.forEach((item) => allGenres.push(item.genres));
  const merged = [].concat.apply([], allGenres);
  return merged;
};

export const getUniqueGenres = (movies) => {
  const genres = getWatchedGenres(movies);
  const unique = [...new Set(genres)];
  return unique;
};

export const findMostPopular = (array) => {
  let keyCounts = {};
  let maxCount = 0;
  let maxKey = null;

  array.forEach((item, val) => {
    keyCounts[item] = keyCounts[item] + 1 || 1;
    if (keyCounts[item] > maxCount) {
      maxKey = item;
      maxCount = keyCounts[item];
    }
  });
  return maxKey;
}

export const getTopGenre = (movies) => {
  if (movies.length === 0) {
    return ``;
  }
  const allGenres = getWatchedGenres(movies).sort();
  return findMostPopular(allGenres);
};

export const countFilmsByGenre = (genre, movies) => {
  const films = movies.filter((item) => item.genres.includes(genre));
  const result = films.length;
  return result;
};

export const countWatchedByGenres = (movies) => {
  const genres = getUniqueGenres(movies);
  return genres.map((item) => countFilmsByGenre(item, movies));
};

export const calculateRank = (quantity) => {
  if (quantity >= 1 && quantity <= 10) {
    return USER_RANKS[0];
  }
  if (quantity >= 11 && quantity <= 20) {
    return USER_RANKS[1];
  }
  if (quantity >= 21) {
    return USER_RANKS[2];
  }
};

export const filterByWatchingDay = (data) => {
  const now = moment();
  return data.filter((item) => moment(item.watchingDate).format(`DD`) === now.format(`DD`));
};

export const filterByWatchingWeek = (data) => {
  const now = moment();
  const currentWeek = moment(now).weeks();
  return data.filter((item) => moment(item.watchingDate).weeks() === currentWeek);
};

export const filterByWatchingMonth = (data) => {
  const now = moment();
  return data.filter((item) => moment(item.watchingDate).format(`MM`) === now.format(`MM`));
};

export const filterByWatchingYear = (data) => {
  const now = moment();
  return data.filter((item) => moment(item.watchingDate).format(`YYYY`) === now.format(`YYYY`));
};

export const filterByWatchingDate = (data, period) => {
  let copy = data.slice();
  switch (period) {
    case `all-time`:
      return copy;
    case `today`:
      return filterByWatchingDay(copy);
    case `week`:
      return filterByWatchingWeek(copy);
    case `month`:
      return filterByWatchingMonth(copy);
    case `year`:
      return filterByWatchingYear(copy);
    default:
      return copy;
 }
};

export const modeSwitcher = (value, charts, board, sort) => {
  console.log(value, charts, board, sort);
  switch (value) {
    case Mode.BOARD:
      charts.hide();
      board.show();
      sort.show();
      break;
    case Mode.CHARTS:
      board.hide();
      sort.hide();
      charts.show();
      break;
  }
};
