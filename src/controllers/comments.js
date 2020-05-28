import {EMOTIONS} from '../constants.js';
import CommentsComponent from '../components/comments.js';
import CommentModel from '../models/comment.js';
import MovieModel from '../models/movie.js';
import {render, RenderPosition} from '../utils/render.js';

export default class CommentsController {
  constructor(commentsModel, onDataChange, movieId, api) {
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._onDataChange = onDataChange;
    this.renderComments = this.renderComments.bind(this);
    this._api = api;
    this._movieId = movieId;
  }

  renderComments(commentBox) {
    this._commentsComponent = new CommentsComponent(this._commentsModel.getComments());
    render(commentBox, this._commentsComponent, RenderPosition.BEFOREEND);

    this._commentsComponent.setDeleteCommentHandler((id) => {
      this._api.deleteComment(id).then(() => {
        this._commentsModel.deleteComment(id);
        this._onDataChange(this._commentsModel.getCommentsIds());
        this._commentsComponent.updateComments(this._commentsModel.getComments());
      })
    });

    this._commentsComponent.onSubmit((newComment) => {
      this._api.createComment(newComment, this._movieId).then((response) => {
        this._commentsModel.setComments(CommentModel.parseComments(response.comments));
        this._onDataChange(MovieModel.parseMovie(response.movie).comments);
        this._commentsComponent.updateComments(this._commentsModel.getComments());
      })
    });
  }
};
