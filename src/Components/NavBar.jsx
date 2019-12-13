import React from "react";
import { Link } from "@reach/router";
import "../stylingCSS/NavBar.css";

const NavBar = props => {
  return (
    <nav className="nav">
      <ul className="ul">
        <Link to={`/`}>
          <li className="li">Home</li>
        </Link>
        <Link to={`/topics/football/articles`}>
          <li className="li">Football</li>
        </Link>
        <Link to={`/topics/coding/articles`}>
          <li className="li">Coding</li>
        </Link>
        <Link to={`/topics/cooking/articles`}>
          <li className="li">Cooking</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
