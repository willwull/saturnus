import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Submission } from "snoowrap";

import { postVote } from "../actions/voting";
import { UserState, mapMixedIdsToContent } from "../reducers/user";
import { PostsState } from "../reducers/posts";
import { CommentsState } from "../reducers/comments";
import { RootState, DispatchType } from "../reducers";
import { fetchSavedContent, fetchMoreSavedContent } from "../actions/user";

import Loading from "../components/Loading";
import ImageMessage from "../components/ImageMessage";
import MixedContentFeed from "../components/MixedContentFeed";

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
  useEffect(
    () => {
      if (!user.savedContent.hasFetched) {
        fetch();
      }
    },
    [user, fetch],
  );

  if (user.savedContent.isLoading || !user.savedContent.hasFetched) {
    return <Loading type="regular" />;
  }

  if (user.savedContent.contentIds.length === 0) {
    return <ImageMessage page={"NoSavedContent"} />;
  }

  const { contentIds, isLoadingMore, hasMoreContent } = user.savedContent;
  const content = mapMixedIdsToContent(contentIds, posts, comments);

  return (
    <>
      <MixedContentFeed
        content={content}
        voteOnPost={voteOnPost}
        isLoadingMore={isLoadingMore}
        showLoadMoreBtn={hasMoreContent}
        loadMoreFunc={fetchMore}
      />
    </>
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
