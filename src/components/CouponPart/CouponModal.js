import React, { useEffect, useState } from "react";
import Portal from "../../components/Modal/Portal";
import PropTypes from "prop-types";
import styled from "styled-components";
import CouponStyle from "../../pages/Coupon/Coupon.module.css";
import { CgClose } from "react-icons/cg";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Popup from "../../components/InquiryPart/Popup";

const CouponModal = ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  background,
  current,
}) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  //popup modal
  const [modalOpen, setModalOpen] = useState(false);
  const [available, setAvailable] = useState(current.availability);

  const userId = window.localStorage.getItem("userId");

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(current, available);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(current, available);
    }
  };

  const isopenModal = () => {
    setModalOpen(true);
  };

  const iscloseModal = () => {
    setModalOpen(false);
  };

  const fetchFunc = () => {
    //백엔드로 데이터 보내기
    fetch(`https://플랜잇.웹.한국:8080/api/coupon/use/${current.cno}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        userId: userId,
      },
      body: JSON.stringify({
        cno: current.cno,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };

  const handleSubmit = () => {
    //쿠폰번호에 맞는 쿠폰 정보값 넘겨줘야함
    fetchFunc();
    iscloseModal();
    setAvailable(false);
  };

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
          <div
            className={
              available
                ? CouponStyle.coupon_modal
                : CouponStyle.coupon_modal_unavail
            }
          >
            {/* <p>cno 불러오기 test : {current.cno}</p> */}
            <h1>친환경 상점 {current.coupon}</h1>
            <p>{current.discount}% 할인쿠폰</p>
            <img src="img/coupon.png" alt="planet-coupon"></img>
            <h2>
              {current.startDate} - {current.endDate}
            </h2>

            <div className={CouponStyle.coupon_info}>
              사용정보
              <button
                onClick={() => {
                  setVisible1(!visible1);
                }}
              >
                {visible1 ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              <br />
              {visible1 && (
                <div style={{ color: "rgba(180, 182, 184, 0.5)" }}>
                  {current.usageInfo}
                </div>
              )}
            </div>

            <div className={CouponStyle.coupon_info}>
              쿠폰설명
              <button
                onClick={() => {
                  setVisible2(!visible2);
                }}
              >
                {visible2 ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              <br />
              {visible2 && (
                <div style={{ color: "rgba(180, 182, 184, 0.5)" }}>
                  {current.couponInfo}
                </div>
              )}
            </div>

            <div className={CouponStyle.coupon_info}>
              상세정보
              <button
                onClick={() => {
                  setVisible3(!visible3);
                }}
              >
                {visible3 ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              <br />
              {visible3 && (
                <div style={{ color: "rgba(180, 182, 184, 0.5)" }}>
                  {current.detailInfo}
                </div>
              )}
            </div>

            <div
              className={`
                ${CouponStyle.coupon_use_btn} ${
                available
                  ? CouponStyle.coupon_available_btn
                  : CouponStyle.coupon_unavailable_btn
              }
              `}
            >
              <button onClick={isopenModal} disabled={!available}>
                {available ? "사용하기" : "사용 완료"}
              </button>
              <Popup
                open={modalOpen}
                close={iscloseModal}
                submit={handleSubmit}
              >
                직원이신가요?
              </Popup>
            </div>
          </div>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
};

export default CouponModal;

CouponModal.defaultProps = {
  background: "#141b27",
  visible: false,
  closable: true,
  maskClosable: true,
};

CouponModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
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
  height: ${(props) => (props.visible ? "none" : "90vh")};
  top: 30%;
  transform: ${(props) => (props.visible ? "translateY(-50%)" : "none")};
  margin: 0 auto;
  padding: 20px 20px;
  color: white;
`;
