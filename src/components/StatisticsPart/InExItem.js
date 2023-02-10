import { format, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";
import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { emoji } from "../../assets/emoji";

function InExItem({ date, items }) {
  const getEcoCount = (value) => {
    let ecoCnt = 0;
    let ecoList = value.ecoList;
    if (ecoList === null || ecoList === undefined) return "N";

    ecoList.forEach((value) => {
      if (value.eco === "G") {
        ecoCnt += 1;
      } else if (value.eco === "R") {
        ecoCnt -= 1;
      }
    });

    if (ecoCnt > 0) return "G";
    else if (ecoCnt < 0) return "R";
    else return "N";
  };
  return (
    <StyledInExBox>
      <div className="inex-date">
        {format(parseISO(date), "d일 EEEE", { locale: ko })}
      </div>
      {items.map((item) => (
        <Link
          key={item.way + item.cost + item.type}
          to={`/statisticsModify`}
          style={{ textDecoration: "none" }}
          state={{
            item: item,
            date: parseISO(date),
          }}
        >
          <StyledItem
            textColor={getEcoCount(item)}
            align={item.ecoList === null ? "center" : "start"}
          >
            <div className="inex-emoji">{emoji[item.way]}</div>

            <div className="inex-memo">
              {item.memo === null ? item.type : item.memo}

              {item.ecoList !== null &&
                item.ecoList.map((data) => {
                  return (
                    <div className={`inex-ecolist ${data.eco}`}>
                      {data.etcMemo !== null ? data.etcMemo : data.ecoDetail}
                    </div>
                  );
                })}
            </div>

            <div className="inex-cost">
              {item.income ? "+" : "-"}
              {item.cost.toLocaleString()}
            </div>
          </StyledItem>
        </Link>
      ))}
    </StyledInExBox>
  );
}

export default InExItem;

const StyledInExBox = styled.div`
  width: 100%;
  .inex-date {
    padding: 14px 0;
    opacity: 0.4;
    font-size: 13px;
    font-weight: 500;
  }
`;

const StyledItem = styled.div`
  width: 100%;
  min-height: 58px;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: ${(props) =>
    props.align === "center" ? "center" : "flex-start"};
  font-size: 14px;

  .inex-emoji {
    font-size: 18px;
  }

  .inex-memo {
    margin-left: 21px;
    color: #b4b6b8;
    font-weight: 400;
    line-height: 17px;
    margin-top: ${(props) => (props.align === "center" ? 0 : 2)}px;
  }

  .G {
    color: #00c982;
  }
  .R {
    color: #566479;
  }
  .N {
    color: #939393;
  }

  .inex-ecolist {
    font-size: 11px;
    line-height: 13px;
  }

  .inex-ecolist {
    &:nth-child(1) {
      margin-top: 4px;
    }
  }

  .inex-cost {
    margin-left: auto;
    color: ${(props) =>
      props.textColor === "G"
        ? "#00C982"
        : props.textColor === "R"
        ? "#566479"
        : "#939393"};
  }
`;
