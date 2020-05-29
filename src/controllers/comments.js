import {SHAKE_ANIMATION_TIMEOUT} from '../constants.js';
import CommentsComponent from '../components/comments.js';
import CommentModel from '../models/comment.js';
import MovieModel from '../models/movie.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CommentsController {
  constructor(commentsModel, onDataChange, movieId, api) {
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._onDataChange = onDataChange;
    this._renderComments = this.renderComments.bind(this);
    this._api = api;
    this._movieId = movieId;
  }

  renderComments(commentBox) {
    this._commentsComponent = new CommentsComponent(this._commentsModel.getComments());
    render(commentBox, this._commentsComponent, RenderPosition.BEFOREEND);

    this._commentsComponent.setDeleteCommentHandler((id) => {
      this._api.deleteComment(id).then(() => {
        this._commentsComponent.setData({
          deleteButtonText: `Deleting...`,
        });
        this._commentsModel.deleteComment(id);
        this._onDataChange(this._commentsModel.getCommentsIds());
        this._commentsComponent.updateComments(this._commentsModel.getComments());
      });
    });

    this._commentsComponent.onSubmit((newComment) => {
      this._api.createComment(newComment, this._movieId).then((response) => {
        this._commentsModel.setComments(CommentModel.parseComments(response.comments));
        this._onDataChange(MovieModel.parseMovie(response.movie).comments);
        this._commentsComponent.updateComments(this._commentsModel.getComments());
      })
      .catch(() => {
        const commentForm = document.querySelector(`.film-details__new-comment`);
        this.shake(commentForm);
      });
    });
  }

  shake(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = ``;
      this._commentsComponent.setData({
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

}
