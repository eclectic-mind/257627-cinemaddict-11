export default class Comment {
  constructor(data) {
    this.id = data.id;
    this.text = data.comment;
    this.emotion = data.emotion;
    this.author = data.author;
    this.dateComment = data.date;
  }

  toRAW() {
    return {
      "id": this.id,
      "author": null,
      "comment": this.text,
      "date": this.dateComment,
      "emotion": this.emotion
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}
