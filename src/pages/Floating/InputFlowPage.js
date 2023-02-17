import React, { useState, useEffect } from "react";
import PageStyle from "../../assets/pageStyle.module.css";
import DateHeader from "../../components/DateHeader";
import { ReactComponent as CalendarIcon } from "../../assets/calendarIcon.svg";
import styled from "styled-components";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

function InputFlowPage() {
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState("");

  return (
    <div className={PageStyle.floating_page_style}>
      <DateHeader goBack={true} close={true}>
        <StyledDiv>
          {format(date, "M월 dd일 EEEEEEE", { locale: ko })}{" "}
          <div className="margin" />
          <CalendarIcon />
        </StyledDiv>
      </DateHeader>
      <div className={PageStyle.content_style}>
        <div>
          <div>지출 금액</div>
          <input
            placeholder="0원"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value + "원")}
          />
        </div>
        <div>
          <div>사용처</div>
          <input
            placeholder="어디에 쓰셨나요?"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default InputFlowPage;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  .margin {
    margin-left: 4px;
  }
`;

function InputCpnt({ text, placeholder, value, onChange, keyboard }) {
  const onChangeFunction = (e) => {
    if (keyboard === "number") {
      format({ phone: e.target.value.replace(/[^0-9]/g, "") });
    }
    onChange(e.target.value);
  };

  return (
    <div>
      <div>{text}</div>
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChangeFunction}
      />
    </div>
  );
}
