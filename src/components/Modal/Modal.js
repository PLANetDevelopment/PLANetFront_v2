import React, { useEffect } from "react";
import Portal from "./Portal";
import PropTypes from "prop-types";
import { CgClose } from "react-icons/cg";
import {
  ModalWrapper,
  ModalOverlay,
  InfoModalOverlay,
  ModalInner,
} from "./ModalStyle";
import {
  calendarInfoData,
  statisticsInfoData,
} from "../../assets/modalExample";
import "../CalendarPart/Calendar.css";

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
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}

export function InfoModal({
  className,
  onClose,
  maskClosable,
  visible,
  type,
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
      <InfoModalOverlay visible={visible} className={className} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <div className="infoModal">
          <CgClose className="modal-close" onClick={close} />
          {type === "calendar"
            ? calendarInfoData(children)
            : statisticsInfoData()}
        </div>
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

InfoModal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool,
};
