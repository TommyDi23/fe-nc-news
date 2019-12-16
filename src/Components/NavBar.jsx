import React from "react";
import { Link } from "@reach/router";
import styles from "../Styling.css/NavBar.module.css";

const NavBar = props => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <Link to={`/`}>
          <li className={styles.li}>Home</li>
        </Link>
        <Link to={`/topics/football/articles`}>
          <li className={styles.li}>Football</li>
        </Link>
        <Link to={`/topics/coding/articles`}>
          <li className={styles.li}>Coding</li>
        </Link>
        <Link to={`/topics/cooking/articles`}>
          <li className={styles.li}>Cooking</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
