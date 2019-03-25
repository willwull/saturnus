import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Submission, Comment as IComment } from "snoowrap";

import { postVote } from "../actions/voting";
import {
  UserState,
  contentIsPost,
  mapMixedIdsToContent,
} from "../reducers/user";
import { PostsState } from "../reducers/posts";
import { CommentsState } from "../reducers/comments";
import { RootState, DispatchType } from "../reducers";
import { fetchSavedContent, fetchMoreSavedContent } from "../actions/user";

import Post from "../components/Post";
import Loading from "../components/Loading";
import ImageMessage from "../components/ImageMessage";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import StandaloneComment from "../components/Comment/StandaloneComment";

// MARK: Types

type StateProps = {
  user: UserState;
  posts: PostsState;
  comments: CommentsState;
};

type DispatchProps = {
  fetch: () => void;
  fetchMore: () => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type Props = StateProps & DispatchProps;

// MARK: Component

function MySavedContent({
  user,
  posts,
  comments,
  fetch,
  fetchMore,
  voteOnPost,
}: Props) {
  useEffect(() => {
    if (!user.savedContent.hasFetched) {
      fetch();
    }
  }, []);

  if (user.savedContent.isLoading || !user.savedContent.hasFetched) {
    return <Loading type="regular" />;
  }

  if (user.savedContent.contentIds.length === 0) {
    return <ImageMessage />;
  }

  const { contentIds, isLoadingMore, hasMoreContent } = user.savedContent;
  const content = mapMixedIdsToContent(contentIds, posts, comments);

  return (
    <div>
      {content.map(content => {
        if (contentIsPost(content)) {
          const post = content as Submission;
          return <Post key={post.id} post={post} voteOnPost={voteOnPost} />;
        }

        const comment = content as IComment;
        return (
          <StandaloneComment
            key={comment.id}
            comment={comment}
            isModal={false}
          />
        );
      })}

      {hasMoreContent && (
        <PrimaryButton
          className="load-more-btn"
          onClick={fetchMore}
          disabled={isLoadingMore}
        >
          Load more
          {isLoadingMore && <Loading type="inline" />}
        </PrimaryButton>
      )}
    </div>
  );
}

// MARK: Redux

function mapStateToProps({ user, posts, comments }: RootState): StateProps {
  return {
    user,
    posts,
    comments,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetch: () => {
      dispatch(fetchSavedContent());
    },
    fetchMore: () => {
      dispatch(fetchMoreSavedContent());
    },
    voteOnPost: (post, vote) => {
      dispatch(postVote(post, vote));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySavedContent);
