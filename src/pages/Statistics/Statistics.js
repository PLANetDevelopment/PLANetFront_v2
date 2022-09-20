import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, isSameMonth, endOfMonth } from "date-fns";
import "./Statistics.css";
import { IoIosArrowForward } from "react-icons/io";
import DonutChart from "../../components/StatisticsPart/DonutChart";
import LineGraph from "../../components/StatisticsPart/LineGraph";
import Eco from "../../components/StatisticsPart/Part2/EcoExpend";

import DateHeader from "../../components/DateHeader";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { EcoBarChart } from "../../components/StatisticsPart/Part2/EcoBarChart";
import { InfoModal } from "../../components/StatisticsPart/Part2/Modal2";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

const containerStyle = {
  backgroundImage: "url(img/main_bg.png)",
  width: "100vw",
  height: "30%",
};

const fetchData = async (userId, currentMonth) => {
  let date = isSameMonth(currentMonth, new Date())
    ? currentMonth
    : endOfMonth(currentMonth);
  const response = await axios.get(
    `https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api/statistics/2022/${format(
      date,
      "M"
    )}/${format(date, "d")}`,
    { headers: { userId: userId } }
  );
  const data = await response.data;
  return data;
};

function StatisticsMain() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setposition] = useState(0);
  const [message, setMessage] = useState(0);
  const [userName, setUserName] = useState("");
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenditureTotal, setExpenditureTotal] = useState(0);
  const [ecoDifference, setEcoDifference] = useState(0);
  const [noEcoDifference, setNoEcoDifference] = useState(0);
  const [ecoTagCounts, setEcoTagCounts] = useState([]);
  const [noEcoTagCounts, setnoEcoTagCounts] = useState([]);
  const [ecoCount, setEcoCount] = useState({});
  const [nowEcoCount, setNowEcoCount] = useState(0);
  const [nowNoneEcoCount, setNowNowEcoCount] = useState(0);
  const [percentage, setPrcentage] = useState(0);
  const [loading, setloading] = useState(true);

  const nowMFormat = "M";
  const userId = window.localStorage.getItem("userId");
  const queryClient = useQueryClient();

  const results = useQuery({
    queryKey: "statisticsData",
    queryFn: () => fetchData(userId, currentMonth),
    enabled: !!userId,
    staleTime: 1000 * 5 * 60, // 5분
    cacheTime: Infinity, // 제한 없음
  });

  const fetchStat = useMutation({
    mutationFn: () => { },
    onSuccess: () => queryClient.invalidateQueries("statisticsData"),
    onError: (error) => console.error(),
  });

  const onchangeDate = (date) => {
    setCurrentMonth(date);
    fetchStat.mutate(date);
  };
  const openModal = (e) => {
    setposition(e.clientY);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData("statisticsData");

      setMessage(messages);
      setUserName(messages.userName === null ? "" : messages.userName);
      setEcoDifference(message.ecoDifference);
      setNoEcoDifference(message.noEcoDifference);
      setIncomeTotal(messages.incomeTotal);
      setExpenditureTotal(messages.expenditureTotal);
      setEcoTagCounts(messages.ecoTagCounts);
      setnoEcoTagCounts(messages.noEcoTagCounts);
      setEcoCount(messages.ecoCount);
      setNowEcoCount(messages.nowEcoCount);
      setNowNowEcoCount(messages.nowNoneEcoCount);
      setPrcentage(messages.percentage);
    }
  }, [queryClient, results]);
  console.log();
  useEffect(() => {
    if (results.status === "success") {
      setloading(false);
    }
  }, [results.status]);

  if (results.status === "loading")
    return (
      <div
        style={{
          width: "100vw",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        로딩중...
      </div>
    );
  if (results.status === "error")
    return (
      <div
        style={{
          width: "100vw",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        문제가 발생했습니다. 잠시 후에 다시 시도해주세요.
      </div>
    );

  return (
    <div className="statistic-main">
      <DateHeader getDate={currentMonth} sendDate={onchangeDate} />
      <div className="stat-main-contents">
        {/* <Link to="/StatisticsView"> */}
        <div className="month-box">
          <div className="month-breakdown">
            <p>{format(currentMonth, nowMFormat)}월 내역</p>
            <IoIosArrowForward className="box-icon" />
          </div>

          <div className="month-breakdown">
            <p>수입</p>
            <h1>{incomeTotal.toLocaleString()}원</h1>
          </div>

          <div className="month-breakdown">
            <p>지출</p>
            <h1>{expenditureTotal.toLocaleString()}원</h1>
          </div>
        </div>
        {/* </Link> */}

        <div className="line-box"></div>

        <div className="tag-graph-box" style={containerStyle}>
          <h1>
            친환경 별자리 관측소 <img src="img/scope.png" alt="scope" />
            &nbsp;
            <AiOutlineQuestionCircle
              className="eco-info"
              onClick={(e) => openModal(e)}
            />
          </h1>
          {isModalOpen && (
            <InfoModal
              className={position}
              onClose={closeModal}
              maskClosable={true}
              visible={true}
              children={true}
            ></InfoModal>
          )}
          <p>지난달 이맘때보다</p>
          <h2>
            친환경 태그가{" "}
            <b style={{ color: "#00C982" }}>{Math.abs(ecoDifference)}개</b>{" "}
            {ecoDifference >= 0 ? "늘고" : "줄고"}
          </h2>
          <h2>
            반환경 태그가{" "}
            <b style={{ color: "#00C982" }}>{Math.abs(noEcoDifference)}개</b>{" "}
            {noEcoDifference >= 0 ? "늘었어요" : "줄었어요"}
          </h2>

          {message.ecoCount !== undefined && (
            <LineGraph dataset={message.ecoCount}></LineGraph>
          )}
        </div>

        <div className="line-box"></div>

        <div className="chart-graph-box">
          <h1>{userName}님의 지출은 건강한가요?</h1>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#07D4A9" }}>
              <span>●</span> {nowEcoCount}
            </p>
            <p style={{ color: "#3A4556" }}>
              <b style={{ color: "#566479" }}>●</b> {nowNoneEcoCount}
            </p>
          </div>
          <div className="donut-chart">
            <DonutChart
              percentage={percentage}
              nowNoneEcoCount={nowNoneEcoCount}
              nowEcoCount={nowEcoCount}
            />
          </div>
        </div>
        <div className="line-box"></div>

        {/* <Link
          to="/EcoCategory"
          state={{
            name: "eco",
          }}
        > */}
        <div className="expend-box">
          <h1>어떤 친환경 지출을 했을까요? 👍</h1>
          <IoIosArrowForward className="box-icon" />
        </div>
        {/* </Link> */}
        <div className="chart">
          <EcoBarChart barData={ecoTagCounts} name="eco"></EcoBarChart>
        </div>
        {ecoTagCounts.length < 2 ? (
          <div className="statistics-box">
            <p
              style={{
                marginBottom: "60px",
                marginTop: "0px",
                fontFamily: "Pretendard",
                height: "52px",
                textAlign: "center",
                color: "#939393",
              }}
            >
              이번달 지출이 없습니다
            </p>
          </div>
        ) : (
          <Eco name="eco"></Eco>
        )}

        <div className="line-box"></div>

        {/* <Link
          to="/EcoCategory"
          state={{
            name: "neco",
          }}
        > */}
        <div className="expend-box">
          <h1>어떤 반환경 지출을 했을까요? 👎</h1>
          <IoIosArrowForward className="box-icon" />
        </div>
        {/* </Link> */}
        <div className="chart">
          <EcoBarChart barData={noEcoTagCounts} name="neco"></EcoBarChart>
        </div>
        {noEcoTagCounts.length < 2 ? (
          <div className="statistics-box">
            <p
              style={{
                marginBottom: "60px",
                marginTop: "0px",
                fontFamily: "Pretendard",
                height: "52px",
                textAlign: "center",
                color: "#939393",
              }}
            >
              이번달 지출이 없습니다
            </p>
          </div>
        ) : (
          <Eco name="neco"></Eco>
        )}
      </div>
      <Footer activeMenu="statistics">
        <div>통계</div>
      </Footer>
    </div>
  );
}

export default StatisticsMain;

const testData = {
  userName: "사용자1",
  incomeTotal: 102000,
  expenditureTotal: 549000,
  ecoDifference: -6,
  noEcoDifference: 3,
  ecoCount: {
    3: 5,
    4: 12,
    5: 22,
    6: 34,
    7: 46,
    8: 55,
  },
  nowEcoCount: 12,
  nowNoneEcoCount: 4,
  percentage: 0.0,
  ecoTagCounts: [
    ["식비", 6],
    ["급여", 2],
    ["기타", 2],
    ["생필품", 2],
    ["더보기", 3],
  ],
  noEcoTagCounts: [
    ["식비", 3],
    ["더보기", 0],
  ],
  more_G_category: 5,
  more_R_category: 10
};
