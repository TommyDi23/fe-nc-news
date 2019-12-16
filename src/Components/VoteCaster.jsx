import React, { Component } from "react";
import { updateCommentVote, updateSelectedArticle } from "../api";
import ErrorDisplay from "./ErrorDisplay";
import styles from "../Styling.css/VoteCaster.module.css";
import LoadingImage from "./LoadingImage";

class VoteCaster extends Component {
  state = {
    voteDifference: 0,
    isLoading: true,
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
      <div className={styles.div}>
        <p className={styles.update}>votes: {votes + voteDifference}</p>
        <p>{err && <ErrorDisplay err={err} />}</p>
        
        <button
          className={styles.btnUp}
          type="button"
          disabled={voteDifference === 1}
          onClick={() => this.handleVote(1)}
          value={1}
        >
          upvote
        </button>

        <button
          className={styles.btnDown}
          type="button"
          disabled={voteDifference === -1}
          onClick={() => this.handleVote(-1)}
          value={-1}
        >
          downvote
        </button>
      </div>
    );
  }
}

export default VoteCaster;
