import {STATS_ALL} from '../constants.js';
import AbstractComponent from './abstract-component.js';

export const makeStats = () => {
  return (
    `<p>${STATS_ALL} movies inside</p>`
  );
};

export default class Stats extends AbstractComponent {
  getTemplate() {
    return makeStats();
  }
}
