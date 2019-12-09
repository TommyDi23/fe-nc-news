import axios from "axios";

const getArticles = (topic) => {
  return axios
    .get(`https://heroku-nc-news.herokuapp.com/api/articles`, {
      params: { topic: topic }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export default getArticles;
