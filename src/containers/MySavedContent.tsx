import React, { useEffect } from "react";
import { UserState } from "../reducers/user";
import { RootState, DispatchType } from "../reducers";
import { connect } from "react-redux";
import { fetchSavedContent } from "../actions/user";
import Loading from "../components/Loading";
import { Submission, Comment } from "snoowrap";
import Post from "../components/Post";

type StateProps = {
  user: UserState;
};

type DispatchProps = {
  fetch: () => void;
};

type Props = StateProps & DispatchProps;

function MySavedContent({ user, fetch }: Props) {
  useEffect(() => {
    if (!user.savedContent.hasFetched) {
      fetch();
    }
  }, []);

  if (user.savedContent.isLoading || !user.savedContent.hasFetched) {
    return <Loading type="regular" />;
  }

  const { content } = user.savedContent;
  return (
    <div>
      {content.map(content => {
        if ((content as Submission).title) {
          const post = content as Submission;
          return <Post key={post.id} post={post} />;
        } else {
          const comment = content as Comment;
          return (
            <p key={comment.id} style={{ color: "red" }}>
              {comment.body}
            </p>
          );
        }
      })}
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySavedContent);
