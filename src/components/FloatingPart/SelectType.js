import React, { useEffect, useState } from "react";
import { emoji } from "../../assets/emoji";

function SelectType({ type, prevData, sendData }) {
  const [selected, setSelected] = useState("");
  const array = type ? emoji.slice(0, 3) : emoji.slice(3, 15);

  useEffect(() => {
    if (prevData !== undefined || prevData !== "") {
      setSelected(prevData);
    }
  }, [prevData]);

  useEffect(() => {
    sendData(selected);
  }, [selected]);

  function handleButton(value) {
    if (value === selected) {
      setSelected("");
    } else {
      setSelected(value);
    }
  }
  return (
    <section className="category-container">
      {array.map((value, idx) => {
        return (
          <button
            key={idx}
            className={`type-box ${
              selected === value.type ? "type-box-clicked" : ""
            }`}
            onClick={() => handleButton(value.type)}
          >
            <p className="type-box-emoji">{value.emoji}</p>
            <p className="type-box-text">{value.type}</p>
          </button>
        );
      })}
    </section>
  );
}

SelectType.defaultProps = {
  propType: { type: "", emoji: "" },
  buttons: true,
};

export default SelectType;
