import React, { Component } from "react";
import { getArticlesById } from "../api";
import ArticleComments from "./ArticleComments";
import LoadingImage from "./LoadingImage";
import CommentAdder from "./CommentAdder";

class ArticleCard extends Component {
  state = {
    article: [],
    isLoading: true
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticlesById(article_id).then(data =>
      this.setState({ article: data, isLoading: false })
    );
  }

  postNewComment = requestBody => {};

  render() {
    const { article, isLoading } = this.state;
    const { user } = this.props.user;
    if (isLoading) return <LoadingImage />;
    return (
      <div>
        <p>
          author: {article.author} <br></br> created: {article.created_at}
          <br></br>
          topic: {article.topic}
        </p>
        <h3>{article.title}</h3>
        <h4>{article.body}</h4>
        <p>
          Votes: {article.votes} <br></br> No. of comments:{" "}
          {article.comment_count}
        </p>
        <CommentAdder />
        <ArticleComments article_id={this.props.article_id} user={user} />
      </div>
    );
  }
}

export default ArticleCard;
