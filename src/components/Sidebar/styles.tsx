import styled from "styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";

export const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px;
  color: inherit;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }

  &.active {
    background: ${props => transparentize(0.85, props.theme.primary)};
    color: ${props => props.theme.primary};
    border-right: 5px solid ${props => props.theme.primary};

    &:hover {
      background: ${props => props.theme.primary};
      color: white;
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
  background: ${props => props.theme.contentBg};
  font-size: 20px;
  padding: 15px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  position: ${(props: SectionTitleProps) =>
    props.sticky ? "sticky" : "initial"};
  top: 0;
`;
