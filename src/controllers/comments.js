import {EMOTIONS} from '../constants.js';
import CommentsComponent from "../components/comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class CommentsController {
  constructor(commentsModel) {
    // this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    // this._onEnterKeyDown = this._onEnterKeyDown.bind(this);
    // this._board = board;
  }

  renderComments(commentBox, comments) {
    this._commentsComponent = new CommentsComponent(comments);
    render(commentBox, this._commentsComponent, RenderPosition.BEFOREEND);
  }

    /*const setCommentsHandlers = () => {
      commentBox.setSubmitHandler((evt) => {
        evt.preventDefault();
        console.log(`enter нажат`);
      });

     this._commentsComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      const comments = this._commentsModel.onDeleteComment(comment.id);
      remove(this._commentsComponent);
      this._board.rerender(comments);
    });

    commentBox.setSubmitHandler((evt) => {
      evt.preventDefault();
      const commentField = document.querySelector(`.film-details__comment-input`);
      commentField.addEventListener(`keydown`, this._onEnterKeyDown);
      console.log(`отправлен новый коммент!`);
    });

    commentBox.setDeleteCommentHandler((evt) => {
      evt.preventDefault();
      const deleteLink = document.querySelectorAll(`.film-details__comment-delete`);
      deleteLink.addEventListener(`click`, this._deleteComment);
      console.log(`коммент должен быть удален`);
    });

  }

  _onEnterKeyDown(evt) {
    const isEnterKey = evt.key === `Enter`;
    if (isEnterKey) {
      console.log(`сабмит!`);
    }
  }
*/
}

