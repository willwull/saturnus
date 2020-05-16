import React, { useEffect, useCallback } from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { RedditUser } from "snoowrap";
import Helmet from "react-helmet";
import { connect, useDispatch } from "react-redux";
import { BannerPage, BannerPageContent } from "../components/Page";
import { Feed } from "../components/PostFeed/styles";
import { RootState } from "../reducers";
import {
  getUserInfo,
  UserpagePostHelpers,
  UserOverviewHelpers,
  UserpageCommentHelpers,
} from "../actions/userpages";
import Loading from "../components/Loading";
import MixedContentFeed from "../components/MixedContentFeed";
import { MixedContent, mapMixedIdsToContent } from "../reducers/user";
import { postVote } from "../actions/voting";
import { BannerImg } from "../components/Banner/styles";
import Banner from "../components/Banner";
import { numberWithSpaces } from "../utils";
import styled from "styled-components";
import { FeedActionStateData } from "../actions/utils";

type ParamProps = {
  username: string;
  contentType?: "posts" | "comments";
};

type StateProps = {
  userInfo: RedditUser | null;
  isLoadingUserInfo: boolean;
  overviewContent: MixedContent[];
  overviewData: FeedActionStateData;
  posts: MixedContent[];
  postsData: FeedActionStateData;
  commentsContent: MixedContent[];
  commentsData: FeedActionStateData;
};

type Props = StateProps & RouteComponentProps<ParamProps>;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled(NavLink)`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 1em;
  justify-content: center;
  color: ${(p) => p.theme.textDeemphasized};

  &.active {
    color: ${(p) => p.theme.primary};
    border-bottom: 3px solid ${(p) => p.theme.primary};
  }

  &:hover {
    color: ${(p) => p.theme.primary};
  }
`;

function UserPage({
  match,
  isLoadingUserInfo,
  userInfo,
  overviewContent,
  overviewData,
  posts,
  postsData,
  commentsContent,
  commentsData,
}: Props) {
  const { username, contentType } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo(username));
    }
    if (!contentType) {
      if (!overviewData.hasFetched) {
        dispatch(UserOverviewHelpers.fetchInitial(username));
      }
    } else if (contentType === "posts") {
      if (!postsData.hasFetched) {
        dispatch(UserpagePostHelpers.fetchInitial(username));
      }
    } else if (contentType === "comments") {
      if (!commentsData.hasFetched) {
        dispatch(UserpageCommentHelpers.fetchInitial(username));
      }
    }
  }, [
    username,
    contentType,
    dispatch,
    userInfo,
    overviewData,
    postsData,
    commentsData,
  ]);

  const loadMore = useCallback(() => {
    if (!contentType) {
      dispatch(UserOverviewHelpers.fetchMore(username));
    } else if (contentType === "posts") {
      dispatch(UserpagePostHelpers.fetchMore(username));
    } else if (contentType === "comments") {
      dispatch(UserpageCommentHelpers.fetchMore(username));
    }
  }, [dispatch, username, contentType]);

  const voteOnPost = useCallback(
    (post, vote) => {
      dispatch(postVote(post, vote));
    },
    [dispatch],
  );

  let feedContent;
  let feedData;
  if (!contentType) {
    feedContent = overviewContent;
    feedData = overviewData;
  } else if (contentType === "posts") {
    feedContent = posts;
    feedData = postsData;
  } else {
    feedContent = commentsContent;
    feedData = commentsData;
  }

  let feed;
  if (isLoadingUserInfo || feedData.isLoading) {
    feed = <Loading type="regular" />;
  } else {
    feed = (
      <Feed>
        <MixedContentFeed
          content={feedContent}
          showLoadMoreBtn={feedData.hasMoreContent}
          isLoadingMore={feedData.isLoadingMore}
          loadMoreFunc={loadMore}
          voteOnPost={voteOnPost}
        />
      </Feed>
    );
  }

  let banner;
  if (isLoadingUserInfo || !userInfo) {
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
        bottom={
          <TabsContainer>
            <Tab exact to={`/user/${userInfo.name}`} replace>
              Overview
            </Tab>
            <Tab to={`/user/${userInfo.name}/posts`} replace>
              Posts
            </Tab>
            <Tab to={`/user/${userInfo.name}/comments`} replace>
              Comments
            </Tab>
          </TabsContainer>
        }
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

        <BannerPageContent>{feed}</BannerPageContent>
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
      userInfo: null,
      isLoadingUserInfo: false,
      overviewContent: [],
      overviewData: UserOverviewHelpers.defaultStateSlice.data,
      posts: [],
      postsData: UserpagePostHelpers.defaultStateSlice.data,
      commentsContent: [],
      commentsData: UserpageCommentHelpers.defaultStateSlice.data,
    };
  }

  const {
    content: overviewIds,
    data: overviewData,
  } = currentUserContent.overview;
  const overviewContent = mapMixedIdsToContent(overviewIds, posts, comments);

  const { content: postIds, data: postsData } = currentUserContent.posts;
  const postsContent = mapMixedIdsToContent(postIds, posts, comments);

  const {
    content: commentIds,
    data: commentsData,
  } = currentUserContent.comments;
  const commentsContent = mapMixedIdsToContent(commentIds, posts, comments);

  return {
    userInfo: currentUserContent.userInfo,
    isLoadingUserInfo: currentUserContent.isLoadingContent,
    overviewContent,
    overviewData,
    posts: postsContent,
    postsData,
    commentsContent,
    commentsData,
  };
}

export default connect(mapStateToProps, null)(UserPage);
