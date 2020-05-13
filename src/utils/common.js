import {FilterType} from "../constants.js";
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

export const formatDuration = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const text = hours != 0 ? `${hours}h${minutes}m` : `${minutes}m`;
  return text;
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
