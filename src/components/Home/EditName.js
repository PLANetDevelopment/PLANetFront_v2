import React, { useState, useEffect } from "react";
import axios from "axios";
import Portal from "../Modal/Portal";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import Style from "./EditName.module.css";
import { CgClose } from "react-icons/cg";
import "../CalendarPart/Calendar.css";
import editscss from "./EditName.css";
import { useQueryClient, useMutation } from "react-query";

export function EditName({ className, onClose, visible, state }) {
  const [text, setText] = useState(state);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const queryClient = useQueryClient();
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; left:0px; right:0px; bottom:0px;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  const editName = useMutation({
    mutationFn: () => fetchFunc(),
    onSuccess: () => {
      // 요청이 성공한 경우
      queryClient.invalidateQueries("homeData");
      console.log("onSuccess");
    },
    onError: (error) => {
      // 요청에 에러가 발생된 경우
      console.log(error);
    },
  });

  const fetchFunc = async () => {
    const response = await axios({
      method: "POST",
      url: `https://플랜잇.웹.한국:8080/api/main/update/${text}`,
      headers: { userId: userId },
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setCount(e.length);

    if (e.target.value === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    //여기서 8자 제한
  };

  const onReset = () => {
    setText("");
  };

  const maxLength = (text) => {
    if (text.length > text.maxLength) {
      text = text.slice(0, text.maxLength);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const onSubmitFn = (e) => {
    e.preventDefault();
    editName.mutate();
    onClose();
  };

  return (
    <Portal elementId="modal-root">
      <InfoModalOverlay visible={visible} className={className} />
      <ModalWrapper className={className} tabIndex={-1} visible={visible}>
        <div className={Style.contents}>
          <form onSubmit={onSubmitFn} className={Style.form}>
            <input
              id="inputMemo"
              type="text"
              value={text}
              onChange={handleChange}
              maxLength="8"
              onInput={maxLength(text)}
            />
            <CgClose onClick={onReset} className={Style.close}></CgClose>

            <p className={Style.count}>{text.length}/8</p>

            <button
              type="submit"
              className={"button" + (disabled ? "Disabled" : "Active")}
              disabled={disabled}
            >
              완료
            </button>
          </form>
          <button className={Style.button1} onClick={close}>
            취소
          </button>
        </div>
      </ModalWrapper>
    </Portal>
  );
}

EditName.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 10%;
  bottom: 0;
  left: 10%;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  outline: 0;
  .infoModal {
    position: relative;
    color: white;
    font-size: 13px;
  }
`;

const InfoModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-color: blue;

  z-index: 3;
  border-style: solid;
  border-color: rgb(20, 27, 39);
  opacity: 0.8;
  border-width: ${(props) => props.className - 10}px 20vh
    calc(100vh - ${(props) => props.className + 20}px) 0;
`;
