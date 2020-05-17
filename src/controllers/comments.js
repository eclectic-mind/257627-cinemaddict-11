import {EMOTIONS} from '../constants.js';
import CommentsComponent from "../components/comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class CommentController {
  constructor(container, commentsModel, boardComponent) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentComponent = null;
    this._board = board;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);
    render(this._container, this._commentComponent, RenderPosition.BEFOREEND);

    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      const comments = this._commentsModel.onDeleteComment(comment.id);
      remove(this._commentComponent);
      this._boardComponent.rerender(comments);
    });


      /* this._popup.setSubmitHandler((evt) => {
        evt.preventDefault();
        const commentField = document.querySelector(`.film-details__comment-input`);
        commentField.addEventListener(`keydown`, this._onEnterKeyDown);
        console.log(`отправлен новый коммент!`);
      });

      this._popup.setDeleteCommentHandler((evt) => {
        evt.preventDefault();
        const deleteLink = document.querySelectorAll(`.film-details__comment-delete`);
        deleteLink.addEventListener(`click`, this._deleteComment);
        console.log(`коммент должен быть удален`);
      });
   */

  }

  _onEnterKeyDown(evt) {
    const isEnterKey = evt.key === `Enter`;
    if (isEnterKey) {
      console.log(`нажали на Enter`);
    }
  }
}
