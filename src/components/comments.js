import {EMOTIONS} from '../constants.js';
import {getRandomNumber, getRandomArrayItem, getRandomFloat, getRandomTime, getRandomBoolean, createFishText, makeControlLinkPopup, formatDate, formatDateForComment, formatDuration} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {encode} from "he";

export const makeComment = (comment) => {
  const {id, text, emotion, author, dateComment} = comment;
  const dateFormatted = formatDateForComment(dateComment);
  return (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${dateFormatted}</span>
    <button class="film-details__comment-delete" id="comment-${id}">Delete</button>
    </p>
    </div>
    </li>`
  );
};

export const makeEmotion = (name) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
     <label class="film-details__emoji-label" for="emoji-${name}">
     <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji-${name}">
     </label>`
  );
};

export const makeEmotionsList = () => {
  const items = EMOTIONS;
  const markup = items.map(item => makeEmotion(item)).join(``);
  return (
    `<div class="film-details__emoji-list">
    ${markup}
    </div>`
  );
};

export const makeComments = (comments, emotion, newComment = ``) => {
  const commentsQuantity = comments ? comments.length : 0;
  const emotions = makeEmotionsList();
  const currentEmotion = emotion !== null && emotion !== undefined ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``;
  const commentsAll = comments.map(item => makeComment(item)).join(``);
  const newCommentEncoded = encode(newComment);

  return (`<section class="film-details__comments-wrap"><h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
        ${commentsQuantity}
        </span></h3>
        <ul class="film-details__comments-list">
        ${commentsAll}
        </ul>
        <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${currentEmotion}
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentEncoded}</textarea>
          </label>
          ${emotions}
        </div></section>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments, emotion = null) {
    super();
    this._comments = comments;
    this._emotion = emotion;
    this._newComment = ``;
    this.setEmotionClickHandler = this.setEmotionClickHandler.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return makeComments(this._comments, this._emotion, this._newComment);
  }

  rerender() {
    super.rerender();
  }

  updateComments(comments) {
    this._comments = comments;
    this.rerender();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.onSubmit(this._submitHandler);
    this.setDeleteCommentHandler(this._deleteCommentHandler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this.setEmotionClickHandler);
    this.setCommentFieldChangeHandler();
  }

  onSubmit(handler) {

    this._submitHandler = handler;
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {

      if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey) && this._emotion) {
        let dateComment = new Date();
        const newCommentEncoded = encode(this._newComment);
        handler({dateComment, text: newCommentEncoded, id: (Date.now() + ``), author: `user`, emotion: this._emotion});
        this._emotion = null;
        this._newComment = ``;
        this.rerender();
      }
    });
  }

  setEmotionClickHandler(evt) {
    evt.preventDefault();
    let value = evt.target.value;
    this._emotion = value;
    this.rerender();
  }

  setCommentFieldChangeHandler(evt) {
    let commentField = this.getElement().querySelector(`.film-details__comment-input`);
    commentField.addEventListener(`change`, () => {
      const commentText = commentField.value;
      this._newComment = commentText;
    });
  }

  setDeleteCommentHandler(handler) {
    this._deleteCommentHandler = handler;
    let commentItems = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    for (let i = 0; i < commentItems.length; i += 1) {
      commentItems[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const id = evt.target.id.slice(8);
      handler(id);
      });
    }
  }

}
