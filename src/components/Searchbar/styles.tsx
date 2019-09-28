import styled from "styled-components";
import { transparentize } from "polished";

export const SearchForm = styled.form`
  background: ${props => props.theme.secondary};
  height: 35px;
  font-size: 16px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  line-height: 1;
  grid-gap: 5px;
  border-radius: 5px;
  transition: 100ms border;

  &,
  & input {
    color: ${props => props.theme.text};
  }

  /*
  Since we add a border on focus, we need an invisible border to
  prevent content jumping when a border is added.
  */
  border: 2px solid rgba(0, 0, 0, 0);

  &:focus-within {
    border: 2px solid ${props => props.theme.primary};
    background: white;

    &,
    & input {
      color: black;
    }
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 98%;
  height: 100%;
  padding: 0;

  &::placeholder {
    color: ${props => transparentize(0.7, props.theme.text)};
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20px;
`;
