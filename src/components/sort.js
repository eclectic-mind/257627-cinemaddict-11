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
