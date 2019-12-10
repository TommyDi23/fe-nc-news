import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import LoadingImage from "./LoadingImage";
import ArticleSorter from "./ArticleSorter";

class ArticlesList extends Component {
  state = {
    sort_by: null,
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }

  fetchArticles = (sort_by) => {
    const { topic } = this.props;
    
    getArticles(topic, sort_by).then(data =>
      this.setState({ articles: data, isLoading: false })
    );
  };

  articlesSortBy = e => {
    const {value} = e.target
    this.fetchArticles(value)
   
  }
  

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <LoadingImage />;
    return (
      <div>
        <ArticleSorter articlesSortBy={this.articlesSortBy} />
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
                <p>author: {article.author}</p>
                <p>comments count: {article.comment_count}</p>
                <p>created: {article.created_at}</p>
                <p>topic: {article.topic}</p>
                <p>votes: {article.votes}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
