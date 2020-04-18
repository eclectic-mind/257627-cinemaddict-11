import {FILM_TITLES, GENRES, GENRE_MIN, GENRE_MAX, POSTER_FILES, DESCR_SENTENCES, DESCR_MAX, DESCR_MIN, COMMENTS_MAX, COUNTRIES} from '../components/constants.js';
import {AGES, RATING_MAX, DURATION_MIN, DURATION_MAX, CAST, WRITERS, PRODUCER} from '../components/constants.js';
import {getRandomNumber, getRandomArrayItem, getRandomFloat, getRandomTime, getRandomBoolean, createFishText} from '../components/utils.js';

export const generateMovie = () => {
  return {
    title: getRandomArrayItem(FILM_TITLES),
    original: getRandomArrayItem(FILM_TITLES),
    description: createFishText(DESCR_MIN, DESCR_MAX, DESCR_SENTENCES),
    poster: getRandomArrayItem(POSTER_FILES),
    genres: createFishText(GENRE_MIN, GENRE_MAX, GENRES),
    // getRandomArrayItem(GENRES),
    duration: getRandomNumber(DURATION_MIN, DURATION_MAX),
    date: getRandomTime(),
    comments: getRandomNumber(0, COMMENTS_MAX),
    country: getRandomArrayItem(COUNTRIES),
    producer: PRODUCER,
    writers: WRITERS.join(`, `),
    cast: CAST.join(`, `),
    rating: getRandomFloat(0, RATING_MAX),
    age: getRandomArrayItem(AGES),
    inWatchlist: getRandomBoolean(),
    inHistory: getRandomBoolean(),
    inFavorites: getRandomBoolean()
  };
};

export const generateMovies = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovie);
};
