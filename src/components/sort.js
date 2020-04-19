import {SORT_BY} from './constants.js';

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

export const doSorting = (data, param) => {
  if (param === `date`) {
    return data.sort((prev, next) => prev.date - next.date);
  }
  if (param === `rating`) {
    return data.sort((prev, next) => prev.rating - next.rating);
  }
  else return data;
};
