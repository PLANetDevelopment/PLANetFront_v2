import React, { useState, useEffect } from "react";
import PageStyle from "../../assets/pageStyle.module.css";
import DateHeader from "../../components/DateHeader";
import { ReactComponent as CalendarIcon } from "../../assets/calendarIcon.svg";
import { ReactComponent as InputClearIcon } from "../../assets/inputClearIcon.svg";
import styled from "styled-components";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import "./InputFlowPage.css";
import SelectType from "../../components/FloatingPart/SelectType";
import BottomButton from "../../components/buttons/BottomButton";
import CustomSwitch from "../../components/buttons/CustomSwitch";

function InputFlowPage() {
  const [isIncome, setIsIncome] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState("");
  const [used, setUsed] = useState("");
  const [category, setCategory] = useState("");

  const onSelectSwitch = (value) => {
    if (value === 1) {
      setIsIncome(true);
      setUsed(1);
    } else {
      setIsIncome(false);
      setUsed("");
    }
    setCost("");
    setCategory("");
  };

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
        <CustomSwitch selectionMode={2} onSelectSwitch={onSelectSwitch} />
        <InputComponent
          name={isIncome ? "수입 금액" : "지출 금액"}
          placeholder="0원"
          value={cost}
          onChange={(value) => setCost(value)}
        />
        {!isIncome && (
          <InputComponent
            name="사용처"
            placeholder="어디에 쓰셨나요?"
            value={used}
            onChange={(value) => setUsed(value)}
          />
        )}

        <div className="input-flow-input-box">
          <div className="input-flow-name">카테고리</div>
          <SelectType
            type={isIncome}
            prevData={category}
            sendData={(value) => setCategory(value)}
          />
        </div>

        <BottomButton
          text="다음으로"
          onClick={() => {}}
          disabled={cost !== "" && category !== "" && used !== ""}
        />
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

const InputComponent = ({ name, placeholder, value, onChange }) => {
  const [text, setText] = useState(value);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <div className="input-flow-input-box">
      <div className="input-flow-name">{name}</div>
      <div className="input-flow-input-flex">
        <input
          className="input-flow-input"
          placeholder={placeholder}
          type={name === "사용처" ? "text" : "number"}
          value={value}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 100);
          }}
          onFocus={() => setFocus(true)}
        />
        {focus && (
          <InputClearIcon
            className="input-flow-clear"
            onClick={() => setText("")}
          />
        )}
      </div>
    </div>
  );
};
