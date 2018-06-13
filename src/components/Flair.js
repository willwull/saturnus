import styled from "@marionebl/styled-components";

const Flair = styled.span`
  display: inline-block;
  transform: translateY(-1px);
  font-size: 14px;
  font-weight: normal;
  padding: 3px 5px;
  border-radius: 5px;
  color: rgb(70, 70, 70);
  background: rgb(239, 243, 245);

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
