import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Page from "../components/Page";
import SearchResults from "../containers/SearchResults";

type Props = RouteComponentProps;

function Searchpage({ location }: Props) {
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const q = searchParams.get("q");

  if (!q) {
    // if search query is empty, go home instead
    return <Redirect to="/" />;
  }

  return (
    <Page>
      Search results for {q}
      <SearchResults query={q} />
    </Page>
  );
}

export default Searchpage;
