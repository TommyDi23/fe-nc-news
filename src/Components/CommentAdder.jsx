import React, { Component } from "react";
import { addCommentToArticle } from "../api";
import styles from "../Styling.css/CommentAdder.module.css";


class CommentAdder extends Component {
  state = {
    body: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { body } = this.state;
    const { article_id, username, postNewComment } = this.props;
    addCommentToArticle(article_id, { username, body })
      .then(newlyPostedComment => {
        postNewComment(newlyPostedComment);
      })
      .then(this.setState({ body: "" }))
  };

  render() {
    const { body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea className={styles.text}
        placeholder='have your say...'
        
          required
          onChange={this.handleChange}
          value={body}
          type="text"
          name="body"
          id="body"
          rows="10"
          cols="100"
        ></textarea>
        <button className={styles.btn}>post</button>
      </form>
    );
  }
}

export default CommentAdder;
