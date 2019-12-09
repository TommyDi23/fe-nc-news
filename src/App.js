import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import ArticlesList from "./Components/ArticlesList";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticlesList path="/" />
        <ArticlesList path="/topics/:topic/articles" />
      </Router>
    </div>
  );
}

export default App;
