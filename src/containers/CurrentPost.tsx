import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { fetchCurrentPost } from "../actions/currentPost";
import Loading from "../components/Loading";
import Post from "../components/Post";
import CommentFeed from "../components/CommentFeed";
import { Submission } from "snoowrap";
import { RootState, DispatchType } from "../reducers";
import { postVote } from "../actions/voting";
import { PostsState } from "../reducers/posts";

// MARK: Types

type StateProps = {
  post: Submission;
  isLoading: boolean;
  errorMsg: string | null;
};

type OwnProps = {
  isModal?: boolean; // used to know whether this comment is rendered inside a page or modal
};

type DefaultProps = {
  isModal: boolean;
};

type DispatchProps = {
  fetch: (postId: string) => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type MatchParams = {
  postId: string;
};

type Props = StateProps &
  OwnProps &
  DispatchProps &
  RouteComponentProps<MatchParams>;

// MARK: Component

class CurrentPost extends Component<Props, {}> {
  static defaultProps: DefaultProps = {
    isModal: false,
  };

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
    const { isLoading, post, voteOnPost, isModal } = this.props;

    if (isLoading || !post) {
      return <Loading type="regular" />;
    }

    return (
      <React.Fragment>
        <Post post={post} expanded voteOnPost={voteOnPost} />
        <CommentFeed comments={post.comments} isModal={!!isModal} />
      </React.Fragment>
    );
  }
}

// MARK: Redux

function mapStateToProps({ currentPost, posts }: RootState): StateProps {
  const id = currentPost.postId;
  return {
    post: posts.byId[id],
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
