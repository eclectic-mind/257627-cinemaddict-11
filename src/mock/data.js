import {FILM_TITLES, GENRES, GENRE_MIN, GENRE_MAX, POSTER_FILES, DESCR_SENTENCES, DESCR_MAX, DESCR_MIN, COMMENTS_MAX, COUNTRIES} from '../constants.js';
import {AGES, RATING_MAX, DURATION_MIN, DURATION_MAX, CAST, WRITERS, PRODUCER, TEXTS, EMOTIONS, AUTHORS} from '../constants.js';
import {getRandomNumber, getRandomArrayItem, getRandomFloat, getRandomTime, getRandomCommentTime, getRandomBoolean, createFishText, getSomeItems} from '../utils/common.js';

const generateComment = () => {
  return {
    id: getRandomNumber(),
    text: getRandomArrayItem(TEXTS),
    emotion: getRandomArrayItem(EMOTIONS),
    author: getRandomArrayItem(AUTHORS),
    dateComment: getRandomCommentTime()
  };
};

const generateCommentsArray = () => {
  const count = getRandomNumber(0, COMMENTS_MAX);
  let comments = [];
  for (let i = 0; i <= count; i += 1) {
    let item = generateComment();
    comments.push(item);
  }
  return comments;
};

export const generateMovie = () => {
  return {
    id: getRandomNumber(),
    title: getRandomArrayItem(FILM_TITLES),
    original: getRandomArrayItem(FILM_TITLES),
    description: createFishText(DESCR_MIN, DESCR_MAX, DESCR_SENTENCES),
    poster: getRandomArrayItem(POSTER_FILES),
    genres: getSomeItems(GENRE_MAX, GENRE_MAX, GENRES),
    duration: getRandomNumber(DURATION_MIN, DURATION_MAX),
    date: getRandomTime(),
    comments: generateCommentsArray(),
    country: getRandomArrayItem(COUNTRIES),
    producer: PRODUCER,
    writers: WRITERS.join(`, `),
    cast: CAST.join(`, `),
    rating: getRandomFloat(0, RATING_MAX),
    age: getRandomArrayItem(AGES),
    inWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

export const generateMovies = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovie);
};
