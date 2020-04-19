import {SORT_BY} from '../constants.js';

const makeSortLink = (name) => {
  return (
    `<li><a href="#" class="sort__button">Sort by ${name}</a></li>`
  );
};

export const makeSortMarkup = () => {
  const names = SORT_BY;
  const links = names.map((item) => makeSortLink(item)).join(``);;
  return (
    `<ul class="sort">
    ${links}
    </ul>`
  );
};

export const doSorting = (array, param) => {
  const data = array.slice(0);
  if (param === `date`) {
    return data.sort((prev, next) => next.date - prev.date);
  }
  if (param === `rating`) {
    return data.sort((prev, next) => next.rating - prev.rating);
  }
  if (param === `comments`) {
    return data.sort((prev, next) => next.comments - prev.comments);
  }
  else return data;
};
