import React, { Component } from "react";
import getArticles from "../api";

class ArticlesList extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { topic } = this.props;
    getArticles(topic).then(data => this.setState({ articles: data }));
  };

  render() {
    const { articles } = this.state;

    return (
      <div>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <h2>{article.title}</h2>
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
