import React from "react";
import { Link } from "@reach/router";

const NavBar = props => {
  return (
    <nav>
      <Link to={`/`}>
        <p>Home</p>
      </Link>
      <Link to={`/topics/football/articles`}>
        <p>Football</p>
      </Link>
      <Link to={`/topics/coding/articles`}>
        <p>Coding</p>
      </Link>
      <Link to={`/topics/cooking/articles`}>
        <p>Cooking</p>
      </Link>
    </nav>
  );
};

export default NavBar;
