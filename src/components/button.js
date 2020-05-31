import {BUTTON_NAME} from '../constants.js';
import AbstractComponent from './abstract-component.js';

export const makeButton = () => {
  return (
    `<button class="films-list__show-more">${BUTTON_NAME}</button>`
  );
};

export default class Button extends AbstractComponent {
  getTemplate() {
    return makeButton();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
