import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "./Statistics.css";
import DateHeader from "../../components/DateHeader";

import InExItem from "../../components/StatisticsPart/InExItem";

function StatisticsWays() {
  const { way, year, month } = useParams();
  const income = way === "income" ? true : false;
  const nowMFormat = "M";

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState(0);
  const [detailDtoList, setDetailDtoList] = useState([]);
  const [detailDtoList2, setDetailDtoList2] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `/statistics/${way}/${format(currentMonth, "yyyy")}/${format(
        currentMonth,
        "M"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data);
        setDetailDtoList(data.detailDtoList);
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
    const data = await response.json();
    setMessage(data);
    setDetailDtoList(data.detailDtoList);
  };
  useEffect(() => {
    if (year !== null || month !== null)
      setCurrentMonth(new Date(year, month - 1, 1));
    fetchData();
    // setMessage(tempData);
    // setDetailDtoList(tempData.detailDtoList);
    // setMessage2(tempData2);
    // setDetailDtoList2(tempData2.detailDtoList);
  }, [year, month]);

  console.log(detailDtoList);

  return (
    <div className="static-detail-container">
      <DateHeader
        goBack={true}
        getDate={currentMonth}
        sendDate={(date) => setCurrentMonth(date)}
      />
      <div className="detail-box">
        <div className="income-detail-box">
          <p>
            {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"} 총액
          </p>
          <h1>
            {income
              ? message.totalMonthIncome.toLocaleString()
              : message.totalMonthExpenditure.toLocaleString()}
            원
          </h1>
        </div>

        <div className="balloon3">
          <p>지난달 이맘때보다</p>
          <h1>
            약{" "}
            <b style={{ color: "#00C982" }}>
              {message.inDif}원 {message.inMore ? "더 " : "덜"}
            </b>
            들어왔어요
          </h1>
          {!income && (
            <div className="green-Box">
              <p>
                친환경 지출에 약 <b style={{ color: "#FFFFFF" }}>30만원 더</b>{" "}
                썼어요
              </p>
              <p>
                반환경 지출에 약 <b style={{ color: "#FFFFFF" }}>30만원 더</b>{" "}
                썼어요
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="line-box" />

      <div className="statistics-option-box">
        {detailDtoList.map((data) => {
          return (
            <div key={data[0].type + data[0].cost}>
              <InExItem date={data.date} items={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

StatisticsWays.defaultProps = {
  income: true,
};

export default StatisticsWays;
