import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SubredditList from "../components/SubredditList";
import Loading from "../components/Loading";
import { RootState } from "../reducers";

const ErrorMessage = styled.div`
  padding: 15px;
`;

function SubscriptionList() {
  const userState = useSelector((state: RootState) => state.user);
  const {
    subsLoading,
    isLoading: userLoading,
    subsError: error,
    subscriptions,
  } = userState;

  const isLoading = subsLoading || userLoading;

  // If we're in the process of getting the user info, we display a loader here
  // because the subscription fetch can't happen until the user info is fetched first.
  if (isLoading && subscriptions.length === 0) {
    return <Loading type="regular" />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return <SubredditList subreddits={subscriptions} />;
}

export default SubscriptionList;
