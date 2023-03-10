import React, { useEffect, useState } from "react";
// import "./Contents.css";
import FloatingButton from "../buttons/FloatingButton";
const asset = [
  { type: "μΉ΄λ", emoji: "π³" },
  { type: "μν", emoji: "π¦" },
  { type: "νκΈ", emoji: "π΅" },
];
const incomeType = [
  { type: "κΈμ¬", emoji: "π°" },
  { type: "μ©λ", emoji: "π" },
  { type: "κΈ°ν", emoji: "π¬" },
];
const expendType = [
  { type: "μλΉ", emoji: "π­" },
  { type: "κ΅ν΅", emoji: "π" },
  { type: "λ¬Ένμν", emoji: "π¬" },
  { type: "μνν", emoji: "βοΈ" },
  { type: "λ§νΈ", emoji: "π" },
  { type: "κ΅μ‘", emoji: "π" },
  { type: "ν΅μ ", emoji: "π±" },
  { type: "μλ£/κ±΄κ°", emoji: "π₯" },
  { type: "κ²½μ‘°μ¬/νλΉ", emoji: "π΅" },
  { type: "κ°μ ", emoji: "π" },
  { type: "κ³΅κ³ΌκΈ", emoji: "π§Ύ" },
  { type: "κΈ°ν", emoji: "π¬" },
];

const allCategory = [asset, incomeType, expendType];
const textSet = [
  "μμ°μ μ νν΄ μ£ΌμΈμ",
  "μΉ΄νκ³ λ¦¬λ₯Ό μ νν΄ μ£ΌμΈμ",
  "ν΄λΉνλ μΉ΄νκ³ λ¦¬λ₯Ό μ νν΄ μ£ΌμΈμ",
];

function SelectType({ propType, type, sendData, buttons }) {
  const [selected, setSelected] = useState({ type: "", emoji: "" });
  const [disabled, setDisabled] = useState(true);
  const array = allCategory[type];
  const text = textSet[type];

  useEffect(() => {
    const data = array.find((x) => x.type === propType.type);
    if (data !== undefined) {
      setSelected(propType);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [propType, array]);

  function handleButton(value) {
    if (value.type === selected.type) {
      setSelected({ type: "" });
      if (!buttons) sendData("");
      setDisabled(true);
    } else {
      setSelected(value);
      if (!buttons) sendData(value);
      setDisabled(false);
    }
  }

  const onClickHandler = (btnType) => {
    if (sendData) {
      sendData({ btnType: btnType, value: selected });
    }
  };

  return (
    <>
      <section className={`shared-container type-container wrap${type}`}>
        <p className="floating-type-text">{text}</p>
        <div className="type">
          {array.map((value, idx) => {
            return (
              <button
                key={idx}
                className={`type-box ${
                  selected.type === value.type ? "type-box-clicked" : ""
                }`}
                onClick={() => handleButton(value)}
              >
                <p className="type-box-emoji">{value.emoji}</p>
                <p className="type-box-text">{value.type}</p>
              </button>
            );
          })}
        </div>
      </section>
      {buttons && (
        <FloatingButton
          className={`float-btn`}
          onClick={onClickHandler}
          disabled={disabled}
        />
      )}
    </>
  );
}

SelectType.defaultProps = {
  propType: { type: "", emoji: "" },
  buttons: true,
};

export default SelectType;
