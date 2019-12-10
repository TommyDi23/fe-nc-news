import React, { Component } from "react";

class CommentAdder extends Component {
  state = {
    body: ""
  };

  handleChange = e => {
    console.log(e.target.id);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          onChange={this.handleChange}
          type="text"
          id="body"
          rows="10"
          cols="90"
        ></textarea>
        <button>post</button>
      </form>
    );
  }
}

export default CommentAdder;
