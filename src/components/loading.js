import AbstractComponent from './abstract-component.js';
import {LOADING_TEXT} from '../constants.js';

const createLoadingTemplate = () => {
  return (
  `<section class="films">
  <section class="films-list">
  <h2 class="films-list__title">${LOADING_TEXT}</h2>
  </section>
  </section>`
  );
};

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
