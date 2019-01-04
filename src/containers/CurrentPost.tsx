import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { fetchCurrentPost } from "../actions/currentPost";
import Loading from "../components/Loading";
import Post from "../components/Post";
import CommentFeed from "../components/CommentFeed";
import { Submission } from "snoowrap";
import { RootState, DispatchType } from "../reducers";
import { Dispatch, Action } from "redux";
import { postVote } from "../actions/voting";
import { CommentInterface } from "../components/Comment";
import { ThunkDispatch } from "redux-thunk";

type StateProps = {
  post: Submission;
  isLoading: boolean;
  errorMsg: string;
};

type DispatchProps = {
  fetch: (postId: string) => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type MatchParams = {
  postId: string;
};

type Props = StateProps & DispatchProps & RouteComponentProps<MatchParams>;

class CurrentPost extends Component<Props, {}> {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.fetch(params.postId);
  }

  componentDidUpdate(prevProps: Props) {
    const {
      match: { params },
      location,
    } = this.props;

    if (location !== prevProps.location) {
      this.props.fetch(params.postId);
    }
  }

  render() {
    const { isLoading, post, voteOnPost } = this.props;

    if (isLoading || !post.id) {
      return <Loading type="regular" />;
    }

    console.log(post);
    return (
      <React.Fragment>
        <Post post={post} expanded voteOnPost={voteOnPost} />

        {/* Workaround until snoowrap types are fixed */}
        <CommentFeed comments={(post.comments as any) as CommentInterface[]} />
      </React.Fragment>
    );
  }
}

function mapStateToProps({ currentPost }: RootState): StateProps {
  return {
    post: currentPost.post,
    isLoading: currentPost.isLoading,
    errorMsg: currentPost.errorMsg,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetch: (postId: string) => {
      dispatch(fetchCurrentPost(postId));
    },
    voteOnPost: (post: Submission, vote: "up" | "down") => {
      dispatch(postVote(post, vote));
    },
  };
}

export default withRouter(
  connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps,
  )(CurrentPost),
);
