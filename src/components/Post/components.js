import styled from "styled-components";

export const ShareButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 24px;
`;

export const VoteButton = styled.button`
  display: block;
  padding: 3px 6px;
`;

export const getVoteColor = vote => {
  switch (vote) {
    case true:
      return "orange";
    case false:
      return "rgb(124, 108, 255)";
    default:
      return "inherit";
  }
};

export const UpvoteBtn = styled(VoteButton)`
  color: ${props => (props.active ? "orange" : "inherit")};
`;

export const DownvoteBtn = styled(VoteButton)`
  color: ${props => (props.active ? "rgb(124, 108, 255)" : "inherit")};

  @media (max-width: 576px) {
    margin-right: 15px;
    margin-top: 0;
  }
`;

export const Score = styled.div`
  color: ${props => getVoteColor(props.vote)};
  margin: 5px 0;
`;
