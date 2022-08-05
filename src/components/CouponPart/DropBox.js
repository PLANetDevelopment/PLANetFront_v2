import React from "react";
import "./Dropbox.css";

const OPTIONS = [
  { value: "lately", name: "최근 받은 순" },
  { value: "expiration", name: "만료임박 순" },
];

const SelectBox = (props) => {
  const handleChange = (e) => {
    // event handler
    console.log(e.target.value);
  };

  return (
    <div className="SelectBoxWrapper">
      <select onChange={handleChange}>
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={props.defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

function DropBox() {
  return <SelectBox options={OPTIONS} defaultValue="lately"></SelectBox>;
}

export default DropBox;
