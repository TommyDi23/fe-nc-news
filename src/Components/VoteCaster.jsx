import React, { Component } from "react";
import { updateCommentVote, updateSelectedArticle } from "../api";
import ErrorDisplay from "./ErrorDisplay";

class VoteCaster extends Component {
  state = {
    voteDifference: 0,
    err: null
  };

  handleVote = inc_vote => {
    const { comment_id, article_id } = this.props;
    this.setState(state => {
      return { voteDifference: state.voteDifference + inc_vote };
    });
    if (comment_id) {
      updateCommentVote(comment_id, inc_vote).catch(({ response }) =>
        this.setState(state => {
          return {
            err: { status: response.status, msg: response.data.msg },
            isLoading: false,
            voteDifference: state.voteDifference - inc_vote
          };
        })
      );
    } else
      updateSelectedArticle(inc_vote, article_id).catch(({ response }) =>
        this.setState(state => {
          return {
            err: { status: response.status, msg: response.data.msg },
            isLoading: false,
            voteDifference: state.voteDifference - inc_vote
          };
        })
      );
  };

  render() {
    const { votes } = this.props;
    const { voteDifference, err } = this.state;
    return (
      <div>
        <p>votes: {votes + voteDifference}</p>
        <p>{err && <ErrorDisplay err={err} />}</p>
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

export default VoteCaster;
