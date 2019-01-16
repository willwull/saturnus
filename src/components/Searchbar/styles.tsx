import styled from "styled-components";
import { transparentize } from "polished";

export const SearchForm = styled.form`
  background: ${props => props.theme.body};
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  line-height: 1;
  grid-gap: 5px;
  border-radius: 25px;
`;

export const Input = styled.input`
  background: none;
  color: ${props => props.theme.text};
  border: none;
  outline: none;
  width: 98%;
  padding: 0;

  &::placeholder {
    color: ${props => transparentize(0.7, props.theme.text)};
  }
`;
