import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Page, { PadOnNarrow } from "../components/Page";
import CurrentSearchResults, {
  SearchType,
} from "../containers/CurrentSearchResults";
import Helmet from "react-helmet";

type Props = RouteComponentProps;

function Searchpage({ location }: Props) {
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get("q");
  const type = searchParams.get("type");

  // if search query is empty, go home instead
  if (!q) {
    return <Redirect to="/" />;
  }

  // type parameter must be either link or subreddit
  if (type && type !== "link" && type !== "sr") {
    return <Redirect to={`/search?q=${q}`} />;
  }

  return (
    <Page>
      <Helmet>
        <title>Search results for "{q}"</title>
      </Helmet>

      <PadOnNarrow>Search results for "{q}":</PadOnNarrow>
      <CurrentSearchResults query={q} type={(type as SearchType) || ""} />
    </Page>
  );
}

export default Searchpage;
