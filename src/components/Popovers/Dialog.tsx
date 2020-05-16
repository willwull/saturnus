import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../Buttons/PrimaryButton";

// MARK: Types

export type DialogProps = {
  text: string;
  title?: string;
  primaryLabel: string;
  onPrimary: () => void;
  focusOnCancel?: boolean;
  type?: "primary" | "destructive";
};

type Props = DialogProps & {
  hideFunc: () => void;
};

// MARK: Styles

const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: ${(p) => p.theme.contentBg};
  width: 550px;
  max-width: 90%;
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
  margin-top: 1.5em;
`;

const CancelButton = styled.button`
  margin-right: 1em;
  padding: 10px 15px;
`;

// MARK: Component

function Dialog({
  title,
  text,
  primaryLabel,
  hideFunc,
  onPrimary,
  focusOnCancel,
  type,
}: Props) {
  const primaryRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focusOnCancel) {
      cancelRef.current?.focus();
    } else {
      primaryRef.current?.focus();
    }
  }, [focusOnCancel]);

  function primaryClickHandler() {
    onPrimary();
    hideFunc(); // Close the dialog after clicking on primary
  }

  return (
    <CenterContent>
      <Container>
        {title && <Title>{title}</Title>}
        {text}
        <ButtonRow>
          <CancelButton ref={cancelRef} onClick={hideFunc}>
            Cancel
          </CancelButton>
          <PrimaryButton
            type={type as any}
            ref={primaryRef}
            onClick={primaryClickHandler}
          >
            {primaryLabel}
          </PrimaryButton>
        </ButtonRow>
      </Container>
    </CenterContent>
  );
}

export default Dialog;
