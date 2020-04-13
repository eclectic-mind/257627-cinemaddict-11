import {SORT_BY} from './constants.js';

export const makeSort = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by ${SORT_BY[0]}</a></li>
    <li><a href="#" class="sort__button">Sort by ${SORT_BY[1]}</a></li>
    <li><a href="#" class="sort__button">Sort by ${SORT_BY[2]}</a></li>
  </ul>`
  );
};
