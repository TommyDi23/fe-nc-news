import React, { Component } from "react";
import { getCommentsByArticleId, deleteCommentByCommentId } from "../api";
import LoadingImage from "./LoadingImage";
import CommentAdder from "./CommentAdder";

class ArticleComments extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    this.fetchArticleComments();
  }
  fetchArticleComments = () => {
    const { article_id } = this.props;
    getCommentsByArticleId(article_id).then(data =>
      this.setState({ comments: data, isLoading: false })
    );
  };
  componentDidUpdate(prevProps, prevState) {
  
    console.log(prevState, "p");
    console.log(this.state, "this");
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
    
    deleteCommentByCommentId(comment_id);
    const filteredComments = this.state.comments.filter(com => com.comment_id !== comment_id);
    this.setState({ comments: filteredComments, isLoading: false });
  };

  render() {
    const { comments, isLoading } = this.state;
    const { article_id, user } = this.props;

    if (isLoading) return <LoadingImage />;

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
                <p>votes:{comment.votes}</p>
                <p>submitted: {comment.created_at}</p>
                <button onClick={() => this.handleDelete(comment.comment_id)}>
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleComments;
