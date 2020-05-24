export default class Movie {
  constructor(data) {
    /* this.id = data[`id`];
    this.description = data[`description`] || ``;
    this.dueDate = data[`due_date`] ? new Date(data[`due_date`]) : null;
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archived`]); */
    this._id = data[`id`];
    this._title = data[`film_info`.title];
    this._original: data[`film_info`.alternative_title];
    this._description: data[`description`];
    this._poster: data[`film_info`.poster];
    this._genres: data[`genre`];
    this._duration: data[`runtime`];
    this._date: data[`release`.date];
    this._country: data[`release`.release_country];
    this._producer: data[`film_info`.director];
    this._writers: data[`film_info`.writers];
    this._cast: data[`actors`];
    this._rating: data[`film_info`.total_rating];
    this._age: data[`film_info`.age_rating];
    this._inWatchlist: Boolean(data[`user_details`.watchlist]);
    this._isWatched: Boolean(data[`user_details`.already_watched]);
    this._isFavorite: Boolean(data[`user_details`.favorite]);
    this._comments: data[`comments`];
    this._watchingDate: data[`user_details`.watching_date]
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
