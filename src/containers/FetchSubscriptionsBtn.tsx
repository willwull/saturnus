import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCw } from "react-feather";
import { fetchMySubs } from "../actions/user";
import { RootState } from "../reducers";

const FetchBtn = styled.button`
  font-size: 0.8em;
  &:disabled {
    opacity: 0.5;
    cursor: normal;
  }
`;

function FetchSubscriptionsBtn() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const isLoading = userState.isLoading || userState.subsLoading;

  function handleClick() {
    if (isLoading) {
      return;
    }

    dispatch(
      fetchMySubs({
        username: userState.data?.name,
        skipCache: true,
      }),
    );
  }

  return (
    <FetchBtn onClick={handleClick} disabled={isLoading}>
      <RefreshCw size={20} className={isLoading ? "spin-animation" : ""} />
    </FetchBtn>
  );
}

export default FetchSubscriptionsBtn;
