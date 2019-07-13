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
import ImageMessage from "../components/ImageMessage";
import Helmet from "react-helmet";

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
    const { errorMsg, isLoading, post, voteOnPost, isModal } = this.props;

    if (errorMsg) {
      console.error(errorMsg);
      return <ImageMessage page="Bug" />;
    }

    if (!post) {
      return <Loading type="regular" />;
    }

    const showCommentSpinner = isLoading && post.comments.length === 0;
    let commentContent;
    if (showCommentSpinner) {
      commentContent = <Loading type="regular" />;
    } else {
      commentContent = (
        <CommentFeed comments={post.comments} isModal={!!isModal} />
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{post.title}</title>
        </Helmet>

        <Post post={post} expanded voteOnPost={voteOnPost} />
        {commentContent}
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
