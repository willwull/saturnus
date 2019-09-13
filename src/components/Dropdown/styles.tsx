import styled from "styled-components";

export const DropdownWrapper = styled.div`
  display: block;
  text-align: inherit;
  overflow: visible;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);

  .theme-dark & {
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.3), 0 2px 4px 0 rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  }
`;
