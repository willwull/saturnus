import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  overflow: scroll;
  -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
  transition: all 600ms;
  background: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &.closed {
    pointer-events: none;
    opacity: 0;
  }
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.contentBg};
  border-radius: 5px;
  min-width: 300px;
  max-width: 800px;
  padding: 20px;
  margin: 30px auto;
  transition: all 600ms;

  &.open {
    transform: translate(0%, 0%);
    pointer-events: all;
  }

  &.closed {
    transform: translate(0%, 100%);
    pointer-events: none;
  }

  /* on smaller screen, make modal "full screen" */
  @media (max-width: 420px) {
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
  }
`;

export const CloseButton = styled.button`
  height: 30px;
  width: 30px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  position: fixed;
  top: 15px;
  right: 15px;
  border-radius: 50%;
  z-index: 1201;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);

  &:active {
    background: rgba(0, 0, 0, 0.7);
  }
`;
