import axios from "axios";

const baseURL = "https://heroku-nc-news.herokuapp.com/api";

export const getArticles = (topic, sort_by) => {
  return axios
    .get(`${baseURL}/articles`, {
      params: { topic: topic, sort_by: sort_by }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticlesById = article_id => {
  return axios.get(`${baseURL}/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = article_id => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const addCommentToArticle = (article_id, requestBody) => {
  return axios
    .post(`${baseURL}/articles/${article_id}/comments`, requestBody)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentByCommentId = comment_id => {
  return axios.delete(`${baseURL}/comments/${comment_id}`)
};
