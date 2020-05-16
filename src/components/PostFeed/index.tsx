import React from "react";
import { Submission } from "snoowrap";

import Post from "../Post";
import PrimaryButton from "../Buttons/PrimaryButton";
import FeedSortOptions from "../FeedSortOptions";
import Loading from "../Loading";
import { NoPosts, Feed } from "./styles";

type Props = {
  posts: Submission[];
  loadMore?: () => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  currentSort?: string;
  currentTimeSort?: string;
  subreddit?: string;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

function PostFeed({
  posts,
  loadMore,
  isLoading,
  isLoadingMore,
  currentSort,
  currentTimeSort,
  subreddit,
  voteOnPost,
}: Props) {
  let content;
  if (isLoading) {
    content = <Loading type="regular" />;
  } else if (posts.length === 0) {
    content = <NoPosts>No posts :(</NoPosts>;
  } else {
    content = (
      <React.Fragment>
        {posts.map((post) => (
          <Post key={post.id} post={post} voteOnPost={voteOnPost} />
        ))}

        <PrimaryButton
          className="load-more-btn"
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          Load more
          {isLoadingMore && <Loading type="inline" />}
        </PrimaryButton>
      </React.Fragment>
    );
  }

  return (
    <Feed>
      {currentSort != null && (
        <FeedSortOptions
          currentSort={currentSort}
          subreddit={subreddit}
          currentTimeSort={currentTimeSort}
        />
      )}
      {content}
    </Feed>
  );
}

PostFeed.defaultProps = {
  subreddit: "",
  currentTimeSort: "",
};

export default PostFeed;
