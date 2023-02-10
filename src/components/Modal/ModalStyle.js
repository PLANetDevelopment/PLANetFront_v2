import styled from "styled-components";

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
  .infoModal {
    position: relative;
    color: white;
    font-size: 13px;
  }

  .modal-close {
    color: rgba(var(--light-gray));
    width: 20px;
    height: 20px;
    float: right;
    cursor: pointer;
  }
  .infoModal .modal-close {
    margin-right: 25px;
    margin-top: 25px;
  }

  .eco-day-circle,
  .eco-day {
    position: fixed;
    top: ${(props) => props.className - 55}px;
    left: 35%;
  }
  .eco-day-circle {
    font-size: 10px;
    color: rgba(var(--blue));
    left: 31%;
  }
  .non-eco-cnt {
    position: fixed;
    top: ${(props) => props.className + 45}px;
    left: 7%;
  }
  .eco-cnt {
    position: fixed;
    top: ${(props) => props.className + 65}px;
    left: 7%;
  }
  .top-arrow {
    position: fixed;
    color: rgba(var(--light-gray));
    width: 20px;
    height: 20px;
    top: ${(props) => props.className - 33}px;
    left: 35%;
  }

  .bottom-arrow {
    position: fixed;
    color: rgba(var(--light-gray));
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

  .calendar-example {
    position: absolute;
    width: 100%;
    top: ${(props) => props.className + 190}px;
  }

  .modal-line-arrow {
    position: fixed;
    color: rgba(var(--light-gray));
    transform: scaleY(-1);
    width: 20px;
    height: 20px;
    top: ${(props) => props.className + 220}px;
    left: 56%;
  }

  .modal-line {
    position: fixed;
    width: 100%;
    top: ${(props) => props.className + 100}px;
  }
  .modal-line-ment {
    position: fixed;
    width: 119px;
    height: 38px;
    left: 62%;
    top: ${(props) => props.className + 240}px;

    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
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
  background-color: rgba(var(--navy), 0.9);
  z-index: 10;
`;

const InfoModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-color: blue;

  z-index: 15;
  border-style: solid;
  border-color: rgba(var(--navy));
  opacity: 0.9;
  border-width: ${(props) => props.className - 10}px 20vh
    calc(100vh - ${(props) => props.className + 20}px) 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.background ? "#202632" : "#141b27")};
  border-radius: 10px;
  width: ${(props) => (props.visible ? "90%" : "100%")};
  height: ${(props) => (props.visible ? "none" : "50vh")};
  top: 50%;
  transform: ${(props) => (props.visible ? "translateY(-50%)" : "none")};
  margin: 0 auto;
  padding: 20px 20px;
  color: white;
`;

export { ModalWrapper, ModalOverlay, InfoModalOverlay, ModalInner };
