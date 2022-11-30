import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EcoExpend.css";
import { useQueryClient } from "react-query";
import { emoji } from "../../../assets/emoji";

const EcoExpendColor = ["#00C982", "#1466FE", "#083FA5", "#728EC6"];
const NEcoExpendColor = ["#8593B1", "#667492", "#475572", "#303B51"];

function EcoExpend({ name }) {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState([]);
  const [loading, setloading] = useState(true);
  const [ecoTagCounts, setEcoTagCounts] = useState([]);
  const [noEcoTagCounts, setNoEcoTagCounts] = useState([]);
  const [moreG, setMoreG] = useState(0);
  const [moreR, setMoreR] = useState(0);

  useEffect(() => {
    const getData = queryClient.getQueryData("statisticsData");

    setMessage(getData);
    setEcoTagCounts(getData.ecoTagCounts);
    setNoEcoTagCounts(getData.noEcoTagCounts);
    setMoreG(getData.more_G_category);
    setMoreR(getData.more_R_category);
    setloading(false);
  }, []);

  const renderExpendList = (name, message) => {
    let renderExpendList = [];

    if (message.length !== 0) {
      if (name === "eco") {
        for (let i = 0; i < ecoTagCounts.length - 1 && i < 4; i++) {
          renderExpendList.push(
            <div>
              <div
                className="day-breakdown-box-icon"
                style={{ color: EcoExpendColor[i] }}
              >
                ● {"  "}
                {emoji[ecoTagCounts[i][0]]}
              </div>
              <h1>{ecoTagCounts[i][0]}</h1>
              <h2>{ecoTagCounts[i][1]}개</h2>
              <p></p>
            </div>
          );
        }
      } else {
        for (let i = 0; i < noEcoTagCounts.length - 1 && i < 4; i++) {
          renderExpendList.push(
            <div>
              <div
                className="day-breakdown-box-icon"
                style={{ color: NEcoExpendColor[i] }}
              >
                ● {emoji[noEcoTagCounts[i][0]]}
              </div>
              <h1>{noEcoTagCounts[i][0]}</h1>
              <h2>{noEcoTagCounts[i][1]}개</h2>
              <p></p>
            </div>
          );
        }
      }
    }

    return <div>{renderExpendList}</div>;
  };

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        로딩중...
      </div>
    );
  return (
    <div className="statistics-box">
      <div className="day-box">
        <div className="day-breakdown-box">
          <p>
            지출 카테고리 <span>태그개수</span>
          </p>
          {renderExpendList(name, message)}
          <Link
            to="/expendCategory"
            state={{
              name: name === "eco" ? "ecoG" : "ecoR",
            }}
          >
            <div className="more">
              <h1 style={{ color: "#C7D2E8" }}>●</h1>
              <h1>더보기 {name === "eco" ? moreG : moreR}개</h1>
              <h2>
                {name === "eco"
                  ? message.ecoTagCounts !== undefined &&
                    message.ecoTagCounts[message.ecoTagCounts.length - 1][1]
                  : message.noEcoTagCounts !== undefined &&
                    message.noEcoTagCounts[
                      message.noEcoTagCounts.length - 1
                    ][1]}
                개
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EcoExpend;
