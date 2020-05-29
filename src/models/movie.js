export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.film_info.title;
    this.original = data.film_info.alternative_title;
    this.description = data.film_info.description;
    this.poster = data.film_info.poster;
    this.genres = data.film_info.genre;
    this.duration = data.film_info.runtime;
    this.date = data.film_info.release.date;
    this.country = data.film_info.release.release_country;
    this.producer = data.film_info.director;
    this.writers = data.film_info.writers;
    this.cast = data.film_info.actors;
    this.rating = data.film_info.total_rating;
    this.age = data.film_info.age_rating;
    this.inWatchlist = Boolean(data.user_details.watchlist);
    this.isWatched = Boolean(data.user_details.already_watched);
    this.isFavorite = Boolean(data.user_details.favorite);
    this.comments = data.comments;
    this.watchingDate = data.user_details.watching_date;
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.original,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.age,
        "director": this.producer,
        "writers": this.writers,
        "actors": this.cast,
        "release": {
          "date": this.date,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.inWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.watchingDate ? this.watchingDate : null,
        "favorite": this.isFavorite
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
