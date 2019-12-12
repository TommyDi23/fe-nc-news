import React, { Component } from "react";
import { updateCommentVote } from "../api";

class CommentVoter extends Component {
  state = {
    voteDifference: 0
  };

  handleVote = inc_vote => {
    const { comment_id } = this.props;
   // const { voteDifference } = this.state;
    updateCommentVote(comment_id, inc_vote)
    this.setState(state => {
      return { voteDifference: state.voteDifference + inc_vote };
    });
    
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleVote(1)} value={1}>
          upvote
        </button>
        <button onClick={() => this.handleVote(-1)} value={-1}>
          downvote
        </button>
      </div>
    );
  }
}

export default CommentVoter;
