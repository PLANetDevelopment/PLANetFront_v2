import React, { useState } from "react";

import styled from "styled-components";

import { AiOutlineQuestionCircle } from "react-icons/ai";

import Lottie from "react-lottie";
import high from "../../planet/1-2.json";
import highmid from "../../planet/1-2.json";
import low from "../../planet/4-2.json";
import mid from "../../planet/3-2.json";
import { Sliders } from "../CalendarPart/Sliders";

const lottieDefault = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    className: "add-class", // svg에 적용
    preserveAspectRatio: "xMidYMid slice",
  },
};

const modalData = [
  {
    animation: high,
    ment: "당신은 행성 히어로!\n지금처럼 착한 소비 이어가주세요 😇",
  },
  {
    animation: highmid,
    ment: "잘 하고 있어요!\n조금 더 노력하면 푸른 행성을 볼 수 있겠어요 🌎",
  },
  {
    animation: mid,
    ment: "노력하셔야겠어요 😱\n 소비를 줄이고 친환경적 소비를 실천해주세요",
  },
  {
    animation: low,
    ment: "반환경 소비는 자제해주세요 ❌\n 당신의 작은 변화가 행성을 바꿀 수 있어요\n플랜잇이 함께 할게요 💪🏻",
  },
];

export function QuestionModal() {
  const [modal, setModal] = useState(true);
  const [position, setPosition] = useState(2);
  const onClickHandler = (e) => {
    setPosition(e.clientX);
    console.log(e.clientX);
    setModal(!modal);
  };

  return (
    <ModalWrapper position={position}>
      <p className="coment">
        나의 행성은 어떤 상태일까요?{" "}
        <AiOutlineQuestionCircle
          className="question"
          onClick={(e) => onClickHandler(e)}
        />
      </p>
      {modal && (
        <div className="question-info">
          <span className="question-green-text">
            친 · 반환경 소비 횟수에 따라
          </span>
          <br />
          행성의 색상이 변화합니다
        </div>
      )}
      <Sliders dots={true} index={0}>
        {modalData.map((data, index) => {
          return (
            <>
              <div className="lottie" key={index}>
                <Lottie
                  options={{ ...lottieDefault, animationData: data.animation }}
                  eventListeners={[
                    {
                      eventName: "complete",
                      callback: () => console.log("the animation completed"),
                    },
                  ]}
                />
              </div>
              <p className="ment" key={10 + index}>
                {data.ment}
              </p>
            </>
          );
        })}
      </Sliders>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  * {
    font-style: normal;
  }

  .question {
    position: relative;
    opacity: 0.4;
    color: #ffffff;
    cursor: pointer;
    margin-left: 5px;
    top: 2px;
  }

  .question-info {
    font-size: 12px;
    position: absolute;
    right: 10%;
    z-index: 10;
    background: rgba(86, 100, 121, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    line-height: 140%;
    padding: 9px;
  }

  .question-info::after {
    content: "";
    position: absolute;
    top: 0;
    // left: 0;
    left: calc(70vw - ${(props) => props.position}px);
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-bottom-color: rgba(86, 100, 121, 0.3);
    border-top: 0;
    margin-left: -20px;
    margin-top: -15px;
  }
  .question-green-text {
    color: rgb(var(--green));
  }

  .lottie {
    box-sizing: border-box;
    width: 280px;
    height: 280px;
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    z-index: 90;
  }

  .coment {
    margin: 35px 5% 15px 5%;

    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: #ffffff;
  }
  .ment {
    margin-bottom: 20px;
    white-space: pre-wrap; /* 줄바꿈용 */

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    /* light grey */
    color: #b4b6b8;
    z-index: 100;
  }
`;
