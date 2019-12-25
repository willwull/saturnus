import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../Buttons/PrimaryButton";

type Props = {
  children: React.ReactNode;
  title?: string;
  primaryLabel: string;
  onCancel: () => void;
  onPrimary: () => void;
  focusOnCancel?: boolean;
};

const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: ${p => p.theme.contentBg};
  max-width: 550px;
  padding: 1.5em;
  border-radius: 5px;

  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);

  .theme-dark & {
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.3), 0 2px 4px 0 rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  }
`;

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
`;

const CancelButton = styled.button`
  margin-right: 1em;
  padding: 10px 15px;
`;

function Dialog({
  title,
  children,
  primaryLabel,
  onCancel,
  onPrimary,
  focusOnCancel,
}: Props) {
  const primaryRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusOnCancel) {
      cancelRef.current && cancelRef.current.focus();
    } else {
      primaryRef.current && primaryRef.current.focus();
    }
  }, []);

  return (
    <CenterContent>
      <Container>
        {title && <Title>{title}</Title>}
        {children}
        <ButtonRow>
          <CancelButton ref={cancelRef} onClick={onCancel}>
            Cancel
          </CancelButton>
          <PrimaryButton ref={primaryRef} onClick={onPrimary}>
            {primaryLabel}
          </PrimaryButton>
        </ButtonRow>
      </Container>
    </CenterContent>
  );
}

export default Dialog;
