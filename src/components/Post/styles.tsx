import styled from "styled-components";
import { Link } from "react-router-dom";

// This component is used to make the entire post covered
// by a Link component, so that the entire post can be
// clicked, including empty areas
// https://www.sarasoueidan.com/blog/nested-links/
export const NavClickTarget = styled(Link)`
  position: absolute !important;
  z-index: 0 !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

export const DropDownBtnWrapper = styled.div`
  margin-left: auto;
  margin-right: 14px;

  button {
    font-size: 1.5em;
    width: 44px;
  }
`;

export const VoteButton = styled.button`
  display: block;
  padding: 3px 6px;
`;

export const getVoteColor = (vote: boolean | null) => {
  switch (vote) {
    case true:
      return "orange";
    case false:
      return "rgb(124, 108, 255)";
    default:
      return "inherit";
  }
};

type VoteBtnProps = {
  active: boolean;
};

export const UpvoteBtn = styled(VoteButton)`
  color: ${(props: VoteBtnProps) => (props.active ? "orange" : "inherit")};
`;

export const DownvoteBtn = styled(VoteButton)`
  color: ${(props: VoteBtnProps) =>
    props.active ? "rgb(124, 108, 255)" : "inherit"};

  @media (max-width: 576px) {
    margin-right: 15px;
    margin-top: 0;
  }
`;

type ScoreProps = {
  vote: boolean | null;
};

export const Score = styled.div`
  color: ${(props: ScoreProps) => getVoteColor(props.vote)};
  margin: 5px 0;
`;

export const SavedIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 1.5em;
`;
