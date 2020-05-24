import Movie from "./models/movies.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getMovies() {
    // return fetch(`https://11.ecmascript.pages.academy/cinemaddict`);
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict`, {headers})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }
};

export default API;
