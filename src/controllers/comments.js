import {EMOTIONS} from '../constants.js';
import CommentsComponent from "../components/comments.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class CommentsController {
  constructor(commentsModel, onDataChange) {
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._onDataChange = onDataChange;
    this.renderComments = this.renderComments.bind(this);
  }

  renderComments(commentBox) {
    this._commentsComponent = new CommentsComponent(this._commentsModel.getComments());
    render(commentBox, this._commentsComponent, RenderPosition.BEFOREEND);

    this._commentsComponent.setDeleteCommentHandler((id) => {
      this._commentsModel.deleteComment(id);
      this._onDataChange(this._commentsModel.getCommentsIds());
      this._commentsComponent.updateComments(this._commentsModel.getComments());
    });

    this._commentsComponent.onSubmit((newComment) => {
      this._commentsModel.addComment(newComment);
      this._onDataChange(this._commentsModel.getCommentsIds());
      this._commentsComponent.updateComments(this._commentsModel.getComments());
    });
  }
}

