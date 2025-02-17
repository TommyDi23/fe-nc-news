import React, { Component } from "react";
import { getArticlesById } from "../api";
import ArticleComments from "./ArticleComments";
import LoadingImage from "./LoadingImage";
import VoteCaster from "./VoteCaster";
import ErrorDisplay from "./ErrorDisplay";
import styles from "../Styling.css/ArticleCard.module.css";


class ArticleCard extends Component {
  state = {
    article: [],
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticlesById(article_id)
      .then(data => this.setState({ article: data, isLoading: false }))
      .catch(({ response }) =>
        this.setState({
          err: { status: response.status, msg: response.data.msg },
          isLoading: false
        })
      );
  }

  render() {
    const { article, isLoading, err } = this.state;
    const { user } = this.props;

    if (isLoading) return <LoadingImage />;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <div className="divAc">
        <ul>
          <li className={styles.li}>
            <p>author: {article.author} </p>
            <p>created: {article.created_at}</p>
            <p>topic: {article.topic}</p>
          </li>
        </ul>

        <h3 className={styles.h3}>{article.title}</h3>
        <h4 className={styles.h4}>{article.body}</h4>
        <VoteCaster article_id={article.article_id} votes={article.votes} />
        <p>No. of comments: {article.comment_count}</p>

        <ArticleComments article_id={this.props.article_id} user={user} />
      </div>
    );
  }
}

export default ArticleCard;
