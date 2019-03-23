import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Submission, Comment as IComment } from "snoowrap";

import { UserState } from "../reducers/user";
import { RootState, DispatchType } from "../reducers";
import { fetchSavedContent, fetchMoreSavedContent } from "../actions/user";

import Post from "../components/Post";
import Loading from "../components/Loading";
import ImageMessage from "../components/ImageMessage";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import StandaloneComment from "../components/Comment/StandaloneComment";

type StateProps = {
  user: UserState;
};

type DispatchProps = {
  fetch: () => void;
  fetchMore: () => void;
};

type Props = StateProps & DispatchProps;

function MySavedContent({ user, fetch, fetchMore }: Props) {
  useEffect(() => {
    if (!user.savedContent.hasFetched) {
      fetch();
    }
  }, []);

  if (user.savedContent.isLoading || !user.savedContent.hasFetched) {
    return <Loading type="regular" />;
  }

  if (user.savedContent.content.length === 0) {
    return <ImageMessage />;
  }

  const { content, isLoadingMore, hasMoreContent } = user.savedContent;
  return (
    <div>
      {content.map(content => {
        if ((content as Submission).title) {
          const post = content as Submission;
          return <Post key={post.id} post={post} />;
        } else {
          const comment = content as IComment;
          return (
            <StandaloneComment
              key={comment.id}
              comment={comment}
              isModal={false}
            />
          );
        }
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

function mapStateToProps({ user }: RootState): StateProps {
  return {
    user,
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySavedContent);
