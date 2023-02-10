import React from "react";
import { ReactComponent as RoundArrow } from "./roundArrow.svg";
import { LineGraph2 } from "../components/StatisticsPart/LineGraph";

export const calendarInfoData = (monthView) => {
  return (
    <>
      <span className="eco-day-circle">● </span>
      <span className="eco-day">는 환경기념일이 있는 날에 표시됩니다</span>
      <RoundArrow className="top-arrow" />
      <RoundArrow className="bottom-arrow" />
      <div className="non-eco-cnt">
        <span className="neco-cal-circle">●</span> 는 반환경적인 소비 항목의
        횟수,
      </div>
      <span className="eco-cnt">
        <span className="eco-cal-circle">●</span> 는 친환경적인 소비 항목의
        횟수를 의미합니다.
      </span>

      {monthView && (
        <>
          <span className="calendar-desc">
            친환경 태그가 많을수록 초록빛을 띠어요
          </span>
          <RoundArrow className="calendar-arrow" />

          <div className="calendar-example">
            {calendarData.map((weeks) => {
              return (
                <div className="week">
                  {weeks.map((day) => {
                    return (
                      <div className="days">
                        <div
                          className={`number eco${day.ecoCount} ${
                            day.incomeDays !== 0 || day.expenditureDays !== 0
                              ? "highlight"
                              : ""
                          } ${day.date === 21 ? "today" : ""}`}
                        >
                          {day.date}
                        </div>
                        {day.incomeDays !== 0 && (
                          <div className="money income">+{day.incomeDays}</div>
                        )}
                        {day.expenditureDays !== 0 && (
                          <div className="money expend">
                            -{day.expenditureDays}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export const statisticsInfoData = () => {
  return (
    <div className="modal-line">
      <LineGraph2 />
      <RoundArrow className="modal-line-arrow" />
      <p className="modal-line-ment">
        친환경 태그가 많을수록 <br />
        초록빛을 띠어요
      </p>
    </div>
  );
};

const calendarData = [
  [
    {
      date: 11,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 12,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 13,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 14,
      incomeDays: 0,
      ecoCount: 3,
      expenditureDays: 14000,
    },
    {
      date: 15,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 16,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 17,
      incomeDays: "12,120",
      ecoCount: 2,
      expenditureDays: 0,
    },
  ],
  [
    {
      date: 18,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 19,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 20,
      incomeDays: "8,900",
      ecoCount: 4,
      expenditureDays: 0,
    },
    {
      date: 21,
      incomeDays: "34,000",
      ecoCount: 3,
      expenditureDays: "128,990",
    },
    {
      date: 22,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 23,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
    {
      date: 24,
      incomeDays: 0,
      ecoCount: 0,
      expenditureDays: 0,
    },
  ],
];
