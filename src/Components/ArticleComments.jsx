import React, { Component } from "react";
import { getCommentsByArticleId, deleteCommentByCommentId } from "../api";
import LoadingImage from "./LoadingImage";
import CommentAdder from "./CommentAdder";
import VoteCaster from "./VoteCaster";
import ErrorDisplay from "./ErrorDisplay";

class ArticleComments extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null
  };

  componentDidMount() {
    this.fetchArticleComments();
  }
  fetchArticleComments = () => {
    const { article_id } = this.props;
    getCommentsByArticleId(article_id)
      .then(data => this.setState({ comments: data, isLoading: false }))
      .catch(({ response }) =>
        this.setState({
          err: { status: response.status, msg: response.data.msg },
          isLoading: false
        })
      );
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments.comment_id !== this.state.comments.comment_id) {
      this.fetchArticleComments();
    }
  }

  postNewComment = newlyPostedComment => {
    this.setState(state => {
      return { comments: [newlyPostedComment, ...state.comments] };
    });
  };

  handleDelete = comment_id => {
    const { user } = this.props;
    const { author } = this.state.comments;
    if (user === author) deleteCommentByCommentId(comment_id);
    const filteredComments = this.state.comments.filter(
      com => com.comment_id !== comment_id
    );
    this.setState({ comments: filteredComments, isLoading: false });
  };

  render() {
    const { comments, isLoading, err } = this.state;
    const { article_id, user } = this.props;

    if (isLoading) return <LoadingImage />;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <div>
        <CommentAdder
          article_id={article_id}
          postNewComment={this.postNewComment}
          username={user}
        />
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <h6>{comment.author}</h6>
                <p>{comment.body}</p>

                <p>submitted: {comment.created_at}</p>
                <button onClick={() => this.handleDelete(comment.comment_id)}>
                  delete
                </button>
                <VoteCaster
                  votes={comment.votes}
                  comment_id={comment.comment_id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleComments;
