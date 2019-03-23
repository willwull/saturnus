import React, { useEffect } from "react";
import { UserState } from "../reducers/user";
import { RootState, DispatchType } from "../reducers";
import { connect } from "react-redux";
import { fetchSavedContent, fetchMoreSavedContent } from "../actions/user";
import Loading from "../components/Loading";
import { Submission, Comment as IComment } from "snoowrap";
import Post from "../components/Post";
import StandaloneComment from "../components/Comment/StandaloneComment";
import PrimaryButton from "../components/Buttons/PrimaryButton";

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
