import styled from "styled-components";

const Flair = styled.span`
  display: inline-block;
  transform: translateY(-1px);
  font-size: 14px;
  font-weight: normal;
  padding: 3px 5px;
  border-radius: 5px;
  color: ${p => p.theme.text};
  background: ${p => p.theme.secondary};

  &.post {
    margin-right: 7px;
    margin-bottom: 5px;
  }

  &.nsfw-flair {
    background: red;
    color: white;
  }

  &.spoiler-flair {
    background: none;
    border: 1px solid;
  }
`;

export default Flair;
