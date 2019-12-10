import React, { Component } from "react";
import { getCommentsByArticleId } from "../api";
import LoadingImage from "./LoadingImage";

class ArticleComments extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    const { article_id } = this.props;
    getCommentsByArticleId(article_id).then(data =>
      this.setState({ comments: data, isLoading: false })
    );
  }

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <LoadingImage />;

    return (
      <div>
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <h6>{comment.author}</h6>
                <p>{comment.body}</p>
                <p>votes:{comment.votes}</p>
                <p>submitted: {comment.created_at}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleComments;
