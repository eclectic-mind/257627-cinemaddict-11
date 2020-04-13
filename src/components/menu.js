import {MENU_ITEMS} from './constants.js';
import {getRandomNumber} from './utils.js';

const makeMenuLink = (name) => {
  let array = name.split(` `);
  let className = array[0].toLowerCase();
  return className;
};

const menuLinks = MENU_ITEMS.map(item => makeMenuLink(item));

export const makeMenu = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#${menuLinks[0]}" class="main-navigation__item main-navigation__item--active">${MENU_ITEMS[0]}</a>
      <a href="#${menuLinks[1]}" class="main-navigation__item">${MENU_ITEMS[1]} <span class="main-navigation__item-count">${getRandomNumber(0, 20)}</span></a>
      <a href="#${menuLinks[2]}" class="main-navigation__item">${MENU_ITEMS[2]} <span class="main-navigation__item-count">${getRandomNumber(0, 20)}</span></a>
      <a href="#${menuLinks[3]}" class="main-navigation__item">${MENU_ITEMS[3]} <span class="main-navigation__item-count">${getRandomNumber(0, 20)}</span></a>
    </div>
    <a href="#${menuLinks[4]}" class="main-navigation__additional">${MENU_ITEMS[4]}</a>
  </nav>`
  );
};
