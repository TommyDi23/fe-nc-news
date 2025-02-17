import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import ArticlesList from "./Components/ArticlesList";
import ArticleCard from "./Components/ArticleCard";
import ErrorDisplay from "./Components/ErrorDisplay";

class App extends React.Component {
  state = {
    user: "jessjelly"
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header user={user} />

        <NavBar />
        <Router>
          <ArticlesList path="/topics/:topic/articles" user={user} />
          <ArticlesList path="/" user={user} />

          <ArticleCard path="articles/:article_id" user={user} />
          <ErrorDisplay default err={{ status: 404, msg: "route not found" }} />
        </Router>
      </div>
    );
  }
}

export default App;
