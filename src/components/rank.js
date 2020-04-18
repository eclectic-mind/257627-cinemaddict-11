import {USER_RANKS} from './constants.js';

export const makeUserRank = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${USER_RANKS[2]}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};
