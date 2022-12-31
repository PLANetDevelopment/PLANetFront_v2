import React, { useEffect } from "react";
import Portal from "../../components/Modal/Portal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import "../../components/CalendarPart/Calendar.css";

export function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  background,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; left:0px; right:0px; bottom:0px;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
      >
        <ModalInner
          visible={visible}
          background={background}
          tabIndex={0}
          className="modal-inner"
        >
          {closable && <CgClose className="modal-close" onClick={close} />}
          <div onClick={close}>{children}</div>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}

Modal.defaultProps = {
  background: "#141b27",
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  font-family: Pretendard;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  outline: 0;

  .modal-close {
    color: #f5f5f5;
    width: 20px;
    height: 20px;
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }

  .top-arrow {
    position: fixed;
    color: #f5f5f5;
    width: 20px;
    height: 20px;
    top: ${(props) => props.className - 33}px;
    left: 35%;
  }

  .bottom-arrow {
    position: fixed;
    color: #f5f5f5;
    transform: rotate(180deg);
    width: 20px;
    height: 20px;
    top: ${(props) => props.className + 10}px;
    left: 13%;
  }

  .calendar-desc {
    position: fixed;
    top: ${(props) => props.className + 150}px;
    left: 45%;
  }
  .calendar-arrow {
    position: fixed;
    top: ${(props) => props.className + 170}px;
    left: 50%;
  }

  .calendars {
    position: absolute;
    width: 100%;
    top: ${(props) => props.className + 190}px;
  }
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(20, 27, 39, 0.9);
  z-index: 3;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.background ? "#202632" : "#141b27")};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: ${(props) => (props.visible ? "90%" : "100%")};
  height: ${(props) => (props.visible ? "none" : "none")};
  top: 35%;
  transform: ${(props) => (props.visible ? "none" : "none")};
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
`;
