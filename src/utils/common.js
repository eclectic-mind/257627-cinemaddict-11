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

// filtering

export const getInWatchlist = (items) => {
  return items.filter((item) => !!item.inWatchlist)
};

export const getWatched = (items) => {
  return items.filter((item) => !!item.inHistory);
};

export const getFavorites = (items) => {
  return items.filter((item) => !!item.inFavorites);
};

export const getMoviesByFilter = (items, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getInWatchlist(items);
    case FilterType.HISTORY:
      return getWatched(items);
    case FilterType.FAVORITES:
      return getFavorites(items);
    case FilterType.ALL:
      return items;
    default:
      return items;
 }
}
