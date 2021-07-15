import styled from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";

export const SidebarLink = styled(NavLink)`
  display: flex;
  gap: 1ch;
  align-items: center;
  padding: 15px;
  color: inherit;

  &.active {
    background: ${(props) => transparentize(0.85, props.theme.primary)};
    color: ${(props) => props.theme.primary};
    border-right: 5px solid ${(props) => props.theme.primary};
  }

  &:hover,
  &:active {
    background: ${(props) => props.theme.primary};
    color: white;
  }

  @media (hover: none) {
    &:hover {
      background: none;
      color: inherit;
    }
  }

  .icon {
    margin-right: 8px;
  }
`;

type SectionTitleProps = {
  sticky?: boolean;
};
export const SectionTitle = styled.h1`
  background: ${(props) => props.theme.contentBg};
  font-size: 20px;
  height: 50px;
  padding: 15px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  position: ${(props: SectionTitleProps) =>
    props.sticky ? "sticky" : "initial"};
  top: 0;
`;
