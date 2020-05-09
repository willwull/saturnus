import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Submission, RedditUser } from "snoowrap";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Page, { BannerPage, BannerPageContent } from "../components/Page";
import { Feed } from "../components/PostFeed/styles";
import { RootState, DispatchType } from "../reducers";
import { getOverviewForUser, fetchMoreUserContent } from "../actions/userpages";
import Loading from "../components/Loading";
import MixedContentFeed from "../components/MixedContentFeed";
import { MixedContent, mapMixedIdsToContent } from "../reducers/user";
import { postVote } from "../actions/voting";
import { BannerImg } from "../components/Banner/styles";
import Banner from "../components/Banner";
import { numberWithSpaces } from "../utils";

type ParamProps = {
  username: string;
};

type StateProps = {
  hasLoaded: boolean;
  isLoadingContent: boolean;
  isLoadingMore: boolean;
  content: MixedContent[];
  hasMoreContent: boolean;
  userInfo: RedditUser | null;
};

type DispatchProps = {
  fetchOverview: (username: string) => void;
  fetchMore: (username: string) => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps<ParamProps>;

function UserPage({
  match,
  hasLoaded,
  content,
  isLoadingContent,
  isLoadingMore,
  fetchOverview,
  fetchMore,
  hasMoreContent,
  voteOnPost,
  userInfo,
}: Props) {
  const { username } = match.params;

  useEffect(
    () => {
      if (!hasLoaded) {
        fetchOverview(username);
      }
    },
    [username],
  );

  let innerContent;
  if (isLoadingContent) {
    innerContent = <Loading type="regular" />;
  } else {
    innerContent = (
      <Feed>
        <MixedContentFeed
          content={content}
          showLoadMoreBtn={hasMoreContent}
          isLoadingMore={isLoadingMore}
          loadMoreFunc={() => fetchMore(username)}
          voteOnPost={voteOnPost}
        />
      </Feed>
    );
  }

  let banner;
  if (isLoadingContent || !userInfo) {
    banner = <BannerImg />;
  } else {
    const subtitle = [
      `${numberWithSpaces(userInfo.link_karma)} post karma`,
      `${numberWithSpaces(userInfo.comment_karma)} comment karma`,
    ].join(" • ");
    const iconSrc = userInfo.icon_img;

    // for some reason, the actual subreddit info is under subreddit.display_name
    const bannerSrc = userInfo.subreddit
      ? (userInfo.subreddit.display_name as any).banner_img
      : "";
    banner = (
      <Banner
        title={userInfo.name}
        subtitle={subtitle}
        iconSrc={iconSrc}
        bannerSrc={bannerSrc}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${username} (u/${username})`}</title>
      </Helmet>

      <BannerPage>
        {banner}

        <BannerPageContent>{innerContent}</BannerPageContent>
      </BannerPage>
    </>
  );
}

function mapStateToProps(
  { userpages, posts, comments }: RootState,
  ownProps: Props,
): StateProps {
  const { username } = ownProps.match.params;
  const currentUserContent = userpages[username];

  if (!currentUserContent) {
    return {
      hasLoaded: false,
      isLoadingContent: false,
      isLoadingMore: false,
      content: [],
      hasMoreContent: false,
      userInfo: null,
    };
  }

  const contentIds = currentUserContent.overviewContentIds;
  const content = mapMixedIdsToContent(contentIds, posts, comments);

  return {
    content,
    hasLoaded: currentUserContent.hasLoaded,
    isLoadingMore: currentUserContent.isLoadingMore,
    isLoadingContent: currentUserContent.isLoadingContent,
    hasMoreContent: currentUserContent.hasMoreContent,
    userInfo: currentUserContent.userInfo,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetchOverview: (username: string) => {
      dispatch(getOverviewForUser(username));
    },
    fetchMore: (username: string) => {
      dispatch(fetchMoreUserContent(username));
    },
    voteOnPost: (post, vote) => {
      dispatch(postVote(post, vote));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
