import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import EcoStyle from "./Eco.module.css";
import HistorySample from "../../components/History/HistoryBackHome";
import { format, isSameMonth } from "date-fns";
import { FiShare } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { Modal } from "../../components/EcoMissionPart/EcoModal";

import DateList from "../../components/DateList";

const EcoMission = () => {
  const [loading, setloading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [todayMission, setTodayMission] = useState({
    name: "",
    emoji: "128703",
  });

  const [missionArr, setMissionArr] = useState([]);
  const [clear, setClear] = useState(false);

  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    fetchData(date);
  }, [date]);

  const isopenModal = () => setIsModalOpen(true);
  const iscloseModal = () => setIsModalOpen(false);

  const fetchData = async (date) => {
    console.log("in function");

    const response = await axios.get(
      `https://플랜잇.웹.한국:8080/api/mission/2022/${format(date, "M")}`,
      {
        headers: { userId: userId },
      }
    );
    const data = await response.data;

    setMissionArr(data.missions);
    setTodayMission({
      emoji: data.todayMission.emoji,
      name: data.todayMission.name,
    });

    let isClear = false;
    if (isSameMonth(new Date(), date)) {
      isClear = data.missions.find((m) => m.name === data.todayMission.name);
    } else {
      isClear = true;
    }
    setClear(isClear);
    setloading(false);
  };

  const fetchPostFunc = () => {
    //백엔드로 데이터 보내기
    fetch(
      `https://플랜잇.웹.한국:8080/api/mission/${todayMission.emoji}/${todayMission.name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          userId: userId,
        },
        body: JSON.stringify({
          mission: todayMission.emoji,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };

  const clearMission = (mission) => {
    let tempArr = missionArr;
    tempArr.unshift(mission);
    setMissionArr(tempArr);
    setClear(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    clearMission(todayMission);
    fetchPostFunc();
  };

  return (
    <div className={EcoStyle.container}>
      <div className={EcoStyle.backBtn}>
        <HistorySample />
      </div>

      <div className={EcoStyle.title}>
        {isModalOpen && (
          <Modal
            onClose={iscloseModal}
            maskClosable={true}
            visible={false}
            closable={true}
            background={"#202632"}
            className="ModalInner"
          >
            <DateList
              getDate={date}
              selectedValue={date}
              onChange={(date) => setDate(date)}
            />
          </Modal>
        )}
        {/* To-do 달 바뀔 때마다 리스트 빈 화면으로 초기화 하기 */}
        {format(date, "M월")}{" "}
        <button onClick={isopenModal} className={EcoStyle.select_month_button}>
          <BsChevronDown />
        </button>
      </div>

      <div className={EcoStyle.title_icon}>
        <FiShare />
      </div>

      <form className={EcoStyle.mission_box}>
        <p>새로운 미션이 도착했어요!</p>
        <h1>오늘의 데일리 에코 미션</h1>

        <div className={EcoStyle.mission_box_input}>
          <div>{todayMission.name !== undefined && todayMission.name}</div>
        </div>

        <p>{String.fromCodePoint(todayMission.emoji)}</p>

        <button
          type="submit"
          //onClick={onCreate}
          onClick={onSubmit}
          className={`${EcoStyle.mission_btn} ${
            clear ? EcoStyle.mission_clear : EcoStyle.mission_yet
          }`}
        >
          {clear ? "달성 완료" : "달성"}
        </button>
      </form>

      <div className={EcoStyle.sub_title}>
        <h1>{format(date, "M월")} 내가 달성한 미션</h1>
        <p>내가 한 미션이 어떤 변화를 만들었을까요?</p>
      </div>

      {/* 달성한 미션 가져오기 */}
      {missionArr.map((famous) => (
        <Mission data={famous} />
      ))}

      <Footer activeMenu="home">
        <div>홈</div>
      </Footer>
    </div>
  );
};

export default EcoMission;

function Mission({ data }) {
  return (
    <div className={EcoStyle.mission_box2}>
      <div className={EcoStyle.mission_icon}>
        {String.fromCodePoint(data.emoji)}
      </div>
      <p>{data.name}</p>
      <button className={EcoStyle.mission_complete_btn}>달성 완료</button>
    </div>
  );
}
