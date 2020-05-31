import AbstractSmartComponent from './abstract-smart-component.js';

export const makeFilmsList = () => {
  return (
    `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmsList extends AbstractSmartComponent {
  getTemplate() {
    return makeFilmsList();
  }

}
