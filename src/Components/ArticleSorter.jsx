import React from "react";

const ArticleSorter = props => {
  return (
    <div>
      <select onChange={e => { props.articlesSortBy(e) }}>
        <option  value="created_at">
          date created
        </option>
        <option  value="comment_count">
          comments
        </option>
        <option  value="votes">
          votes
        </option>
      </select>
    </div>
  );
};

export default ArticleSorter;
