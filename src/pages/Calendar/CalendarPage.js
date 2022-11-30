import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQueries, useQueryClient } from "react-query";
import { format, isSameMonth, subMonths, parseISO } from "date-fns";
import Footer from "../../components/Footer/Footer";
import DateHeader from "../../components/DateHeader";
import Calendar from "../../components/CalendarPart/CalendarBody";
import DetailList from "../../components/CalendarPart/DetailList";
import Quote from "../../components/CalendarPart/Quote";
import EcoDay from "../../components/CalendarPart/EcoDay";
import { InfoModal } from "../../components/Modal/Modal";
import "../../components/CalendarPart/Calendar.css";

import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const userId = window.localStorage.getItem("userId");

const fetchData = async (date) => {
  const response = await axios.get(
    `https://플랜잇.웹.한국:8080/api/calendar/${format(date, "yyyy")}/${format(
      date,
      "M"
    )}`,
    { headers: { userId: userId } }
  );
  const data = await response.data;

  return data;
};

const fetchDetailData = async (day) => {
  const date = parseISO(day);

  const response = await axios.get(
    `https://플랜잇.웹.한국:8080/api/calendar/${format(date, "yyyy")}/${format(
      date,
      "M"
    )}/${format(date, "d")}`,
    { headers: { userId: userId } }
  );
  const data = await response.data;

  return data;
};

function CalendarPage() {
  const dateFormat = "yyyy-MM-dd";
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setposition] = useState(0);

  const [message, setMessage] = useState({});
  const [daysData, setDaysData] = useState([]);
  const [anniversary, setAnniversary] = useState([]);
  const [quote, setquote] = useState("");
  const [isMonthView, setIsMonthView] = useState(true);

  const months = [subMonths(currentDate, 1), currentDate];

  const results = useQueries(
    months.map((m) => {
      return {
        queryKey: ["calnedarData", format(m, "yyyy-M")],
        queryFn: () => fetchData(m),
      };
    })
  );

  const details = useQueries(
    daysData.map((data) => {
      return {
        queryKey: ["detailData", data.date],
        queryFn: () => fetchDetailData(data.date),
      };
    })
  );

  useEffect(() => {
    if (results[1].status === "success") {
      const getData = queryClient.getQueryData([
        "calnedarData",
        format(currentDate, "yyyy-M"),
      ]);
      setLoading(false);
      setMessage(getData.calendarDto);
      setquote(getData.content);
      setDaysData(getData.calendarDto.calendarDayDtos);
      setAnniversary(getData.anniversaryList);
    }
  }, [currentDate, results[1].status]);

  const changeDate = (date) => {
    setSelectedDate(date);
    if (!isSameMonth(date, currentDate)) {
      setCurrentDate(date);
    }
  };

  const openModal = (e) => {
    setposition(e.clientY);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const changeWeekMonth = () => {
    setIsMonthView(!isMonthView);
  };

  const renderMiddleBar = () => {
    let nEco = message.sumOfNoneEcoCount; //받아올 데이터
    let eco = message.sumOfEcoCount;
    return (
      <div className="calendar-info">
        <span className="neco-cal-circle">● {!loading ? nEco : 0}</span>
        <span className="eco-cal-circle">● {!loading ? eco : 0}</span>
        <span className="eco-day-circle">●</span>
        <span className="eco-day">환경 기념일</span>
        <AiOutlineQuestionCircle
          className="eco-info"
          onClick={(e) => openModal(e)}
        />
        <span className="calendar-toggle" onClick={() => changeWeekMonth()}>
          {isMonthView ? "월" : "주"}
        </span>
        <IoIosArrowForward
          className={`calendar-toggle-icon ${isMonthView ? "fold" : ""}`}
          onClick={() => changeWeekMonth()}
        />
      </div>
    );
  };

  return (
    <div className="calendarPage" style={{ marginBottom: "100px" }}>
      <DateHeader
        getDate={currentDate}
        sendDate={(date) => setCurrentDate(date)}
      />
      <div className={`cald ${!isMonthView ? "move" : ""}`}>
        <Quote
          value={
            results[1].status === "error"
              ? "문제가 발생했습니다\n 네트워크 상태를 확인해주세요."
              : quote
          }
        />
        <div className={`month-info`}>
          <div className="month-cost">
            <div className="month-type">수입</div>
            <div className="month-total">
              {!loading ? message.totalMonthIncome.toLocaleString() : 0}원
            </div>
          </div>
          <div className="month-cost">
            <div className="month-type">지출</div>
            <div className="month-total">
              {!loading ? message.totalMonthExpenditure.toLocaleString() : 0}원
            </div>
          </div>
        </div>

        {isModalOpen && (
          <InfoModal
            className={position}
            onClose={closeModal}
            maskClosable={true}
            visible={true}
            type="calendar"
            children={isMonthView}
          />
        )}

        {renderMiddleBar()}
        <Calendar
          monthView={isMonthView}
          events={daysData}
          ecoEvents={anniversary}
          selectedValue={selectedDate}
          currentValue={currentDate}
          onChange={changeDate}
        />
        {anniversary.find((x) => x[0] === format(selectedDate, dateFormat)) && (
          <EcoDay
            value={anniversary.find(
              (x) => x[0] === format(selectedDate, dateFormat)
            )}
          />
        )}

        {daysData.find(
          (data) => data.date === format(selectedDate, dateFormat)
        ) ? (
          details !== undefined &&
          details.length !== 0 &&
          details[0].status === "success" && <DetailList value={selectedDate} />
        ) : (
          <div
            style={{
              fontSize: "12px",
              color: "#8B8B8B",
              textAlign: "center",
              padding: "30px 0",
            }}
          >
            내역 없음
          </div>
        )}
      </div>
      <Footer activeMenu="calendar">
        <div>달력</div>
      </Footer>
    </div>
  );
}

export default CalendarPage;

CalendarPage.defaultProps = {
  message: {
    calendarDayDtos: [],
    sumOfEcoCount: 0,
    sumOfNoneEcoCount: 0,
    totalMonthExpenditure: 0,
    totalMonthIncome: 0,
  },
};
