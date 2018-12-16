import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SubredditFeed from "../containers/SubredditFeed";

type Params = {
  sortMode: string;
};

type Props = RouteComponentProps<Params>;

function Frontpage({ match: { params } }: Props) {
  const { sortMode } = params;
  return (
    <div className="main-content">
      <SubredditFeed subreddit="" sortMode={sortMode} />
    </div>
  );
}

export default Frontpage;
