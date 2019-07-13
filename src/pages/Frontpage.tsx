import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SubredditFeed from "../containers/SubredditFeed";
import { PostsSortMode } from "../reducers/posts";
import Helmet from "react-helmet";

type Params = {
  sortMode: string;
};

type Props = RouteComponentProps<Params>;

function Frontpage({ match: { params } }: Props) {
  const { sortMode } = params;
  return (
    <div className="main-content">
      <Helmet>
        <title>Saturnus</title>
      </Helmet>
      <SubredditFeed subreddit="" sortMode={sortMode as PostsSortMode} />
    </div>
  );
}

export default Frontpage;
