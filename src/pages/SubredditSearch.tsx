import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Page, { PadOnNarrow } from "../components/Page";
import CurrentSearchResults from "../containers/CurrentSearchResults";
import Helmet from "react-helmet";

export type MatchParams = {
  subreddit: string;
};

type Props = RouteComponentProps<MatchParams>;

function SubredditSearch({ location, match }: Props) {
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get("q");
  const restrictSr = searchParams.get("restrict_sr");

  // if search query is empty, go home instead
  if (!q) {
    return <Redirect to="/" />;
  }

  const subreddit = match.params.subreddit;

  // if restrict_sr isn't true, just redirect to regular search page
  if (!restrictSr) {
    return <Redirect to={`/search?q=${q}`} />;
  }

  return (
    <Page>
      <Helmet>
        <title>
          Search results for "{q}" in r/{subreddit}
        </title>
      </Helmet>

      <PadOnNarrow>
        Search results for "{q}" in r/{subreddit}:
      </PadOnNarrow>
      <CurrentSearchResults query={q} limitToSub={subreddit} type="link" />
    </Page>
  );
}

export default SubredditSearch;
