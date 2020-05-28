export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  getCommentById(id) {
    return this._comments.find((item) => item.id === id);
  }

  getCommentsIds() {
    return this._comments.map((item) => item.id);
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  deleteComment(id) {
    const index = this._comments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addComment(newComment) {
    this._comments = [].concat(newComment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }
};
