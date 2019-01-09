import styled from "styled-components";
import { lighten } from "polished";

export const SubIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 1ch;
  border-radius: 50%;
`;

export const FallBackIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 1ch;
  border-radius: 50%;
  background: ${props => props.color || lighten(0.1, props.theme.primary)};
`;

export const ListLetter = styled.div`
  background: ${props => props.theme.body};
  padding: 10px 15px;
  position: sticky;
  top: 45px;
`;
