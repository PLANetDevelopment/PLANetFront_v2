import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as Close } from "../assets/closeIcon.svg";
import styled from "styled-components";

function DateHeader({ goBack, close, children }) {
  const navigate = useNavigate();

  return (
    <StyledDateHeader>
      <div className="dateheaderDiv">
        {goBack ? (
          <Arrow
            onClick={() => {
              navigate(-1);
            }}
          />
        ) : (
          <div className="emptyIcon" />
        )}

        <div className="col col-center">{children}</div>
        {close ? (
          <Close
            onClick={() => {
              navigate(-1);
            }}
          />
        ) : (
          <div className="emptyIcon" />
        )}
      </div>
    </StyledDateHeader>
  );
}

DateHeader.defaultProps = {
  goBack: false,
  close: false,
};

const StyledDateHeader = styled.div`
  position: fixed;
  width: calc(100% - 32px);
  z-index: 30;
  .emptyIcon {
    width: 24px;
    height: 24px;
  }

  .col {
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .dateheaderDiv {
    display: flex;
    flex-direction: row;
    padding: 11px 0;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(var(--navy));
  }
`;

export default DateHeader;
