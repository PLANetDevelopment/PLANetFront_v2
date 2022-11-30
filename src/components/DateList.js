import React, { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import styled from "styled-components";

function DateList({ getDate, selectedValue, onChange }) {
  const [currentFixMonth, setCurrentFixMonth] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(getDate); //new Date()
  const [selectedDate, setSelectedDate] = useState(selectedValue);

  useEffect(() => {
    setCurrentMonth(getDate);
  }, [getDate]);

  const yNmFormat = "yyyy년 M월";

  const onMonthClickHandle = (date) => {
    //date값이 yyyy년 M월으로 넘어감
    const year = date.slice(0, 4);
    const month = date.slice(6, -1);
    const day = currentMonth.getDate();

    const newDate = new Date(year + "-" + month + "-" + day);

    if (month !== currentMonth.getMonth() + 1) {
      setCurrentMonth(newDate);
    }

    onChange(newDate);
    setSelectedDate(newDate);
  };

  const dates = [
    format(currentFixMonth, yNmFormat),
    format(subMonths(currentFixMonth, 1), yNmFormat),
    format(subMonths(currentFixMonth, 2), yNmFormat),
    format(subMonths(currentFixMonth, 3), yNmFormat),
    format(subMonths(currentFixMonth, 4), yNmFormat),
    format(subMonths(currentFixMonth, 5), yNmFormat),
    format(subMonths(currentFixMonth, 6), yNmFormat),
    format(subMonths(currentFixMonth, 7), yNmFormat),
    format(subMonths(currentFixMonth, 8), yNmFormat),
  ];

  const listItem = dates.map((date) => (
    <li
      onClick={() => {
        onMonthClickHandle(date);
      }}
    >
      {date}
    </li>
  ));

  return (
    <StyledDateHeader>
      <div className="datelist-title">월 선택하기</div>

      <div className="col list-item">{listItem}</div>
    </StyledDateHeader>
  );
}

DateList.defaultProps = {
  goBack: false,
};

const StyledDateHeader = styled.div`
  li {
    list-style: none;
    padding-left: 0px;
    width: 100%;
    padding: 6%;
    color: rgba(180, 182, 184, 1);
    font-size: 16px;
  }

  li:hover {
    background: rgba(20, 27, 39, 1);
  }

  .datelist-title {
    position: relative;
    width: 30%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    left: 35%;
    margin-top: 1%;
  }

  .list-item {
    margin-top: 7%;
  }

  .col {
    margin: 10;
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }
`;

export default DateList;
