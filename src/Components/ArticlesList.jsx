import React, { Component } from "react";
import { getArticles } from "../api";
import { Link } from "@reach/router";
import LoadingImage from "./LoadingImage";
import ArticleSorter from "./ArticleSorter";
import ErrorDisplay from "./ErrorDisplay";
import "../stylingCSS/ArticleList.css";

class ArticlesList extends Component {
  state = {
    sort_by: null,
    articles: [],
    isLoading: true,
    err: null
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }

  fetchArticles = sort_by => {
    const { topic } = this.props;
   

    getArticles(topic, sort_by)
      .then(data => this.setState({ articles: data, isLoading: false }))
      .catch(({ response }) =>
        this.setState({
          err: { status: response.status, msg: response.data.msg },
          isLoading: false
        })
      );
  };
  

  articlesSortBy = e => {
    const { value } = e.target;
    this.fetchArticles(value);
  };

  render() {
    const { articles, isLoading, err } = this.state;
    if (isLoading) return <LoadingImage />;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <div className='div'>
        <ArticleSorter className='as' articlesSortBy={this.articlesSortBy} />
        <ul>
          {articles.map(article => {
            return (
              <li className='li' key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
                <p className='p'>author: {article.author}</p>
                <li>comments count: {article.comment_count}</li>
                <li>created: {article.created_at}</li>
                <li>topic: {article.topic}</li>
                <li>votes: {article.votes}</li>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
