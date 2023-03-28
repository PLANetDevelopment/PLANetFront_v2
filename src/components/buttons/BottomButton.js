import React from "react";
import styled from "styled-components";

function BottomButton({ text, onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
}

export default BottomButton;

const StyledButton = styled.button`
  background-color: rgb(var(--green));
  border: 0;
  border-radius: 13px;
  width: calc(100% - 48px);
  height: 48px;
  color: rgb(var(--black));
  font-weight: 600;
  letter-spacing: 0.01em;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;

  :not(:disabled) {
    opacity: 0.2;
  }
`;
