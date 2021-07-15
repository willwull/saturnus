import React from "react";
import { MixedContent, contentIsPost } from "../../reducers/user";
import Post from "../Post";
import { Submission, Comment } from "snoowrap";
import StandaloneComment from "../Comment/StandaloneComment";
import PrimaryButton from "../Buttons/PrimaryButton";
import Loading from "../Loading";

type Props = {
  content: MixedContent[];
  showLoadMoreBtn: boolean;
  isLoadingMore: boolean;
  loadMoreFunc?: () => void;
  voteOnPost?: (post: Submission, vote: "up" | "down") => void;
};

function MixedContentFeed({
  content,
  showLoadMoreBtn,
  loadMoreFunc,
  isLoadingMore,
  voteOnPost,
}: Props) {
  return (
    <>
      {content.map((content) => {
        if (contentIsPost(content)) {
          const post = content as Submission;
          return <Post key={post.id} post={post} voteOnPost={voteOnPost} />;
        }

        const comment = content as Comment;
        return (
          <StandaloneComment
            key={comment.id}
            comment={comment}
            isModal={false}
          />
        );
      })}

      {showLoadMoreBtn && (
        <PrimaryButton
          className="load-more-btn"
          onClick={loadMoreFunc}
          disabled={isLoadingMore}
        >
          Load more
          {isLoadingMore && <Loading type="inline" />}
        </PrimaryButton>
      )}
    </>
  );
}

export default MixedContentFeed;
