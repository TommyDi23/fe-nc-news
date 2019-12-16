import React from "react";
import styles from "../Styling.css/Header.module.css";

const Header = props => {
  return (
    <div>
      <header className={styles.header}>NC-News</header>
      <p className={styles.p}>welcome {props.user}</p>
    </div>
  );
};

export default Header;
