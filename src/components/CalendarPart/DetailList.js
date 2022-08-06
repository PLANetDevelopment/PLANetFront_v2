import React, { useState, useEffect } from "react";
import parseISO from "date-fns/parseISO";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import ko from "date-fns/locale/ko";
import { StyledDetailBlock } from "./StyledDetail";

const isEco = (ecoCnt) => (ecoCnt > 0 ? "eco" : ecoCnt < 0 ? "neco" : "etc");
const isEcoT = (eco) => (eco === "G" ? "eco" : eco === "R" ? "neco" : "etc");

function DetailList({ value }) {
  let date = value;
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [totalList, setTotalList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  useEffect(() => {
    if (date !== undefined || date !== null) {
      const getData = queryClient.getQueryData([
        "detailData",
        format(date, "yyyy-MM-dd"),
      ]);
      setData(getData);
    }
  }, [date]);

  const setData = (data) => {
    let moneySum = 0;
    let totalTemp = [];
    let detailTemp = [];

    if (data.totalMoney !== undefined && data.totalDetails !== undefined) {
      totalTemp = Object.keys(data.totalMoney).map((key) => {
        moneySum += data.totalMoney[key];
        return { name: key, value: data.totalMoney[key] };
      });

      detailTemp = Object.keys(data.totalDetails).map((key) => {
        return { name: key, value: data.totalDetails[key] };
      });
      setLoading(false);
    }

    setTotalList(totalTemp);
    setDetailList(detailTemp);
    setTotalMoney(moneySum);
  };

  const renderDetailList = (detail) => {
    let detailTemp = [];
    let ecoCnt = 0;
    detailTemp = detail.value.map((data) => {
      ecoCnt = 0;
      data.ecoList !== undefined &&
        data.ecoList !== null &&
        data.ecoList.forEach((data) => {
          if (data.eco === "G") {
            ecoCnt += 1;
          } else if (data.eco === "R") {
            ecoCnt -= 1;
          }
        });
      return (
        <div className="details" key={data.id}>
          <div className={`details-circle ${isEco(ecoCnt)}`}>● &nbsp;</div>
          <DetailItem item={data} ecoCnt={ecoCnt} />
        </div>
      );
    });

    return detailTemp;
  };

  const renderList = () => {
    let renderList = [];

    renderList = totalList.map((data, i) => {
      return (
        <Link
          key={data.name + i}
          className="detail-link"
          to={`/calendar/${format(date, "M")}/${format(date, "d")}`}
          state={{
            date: value,
            type: data,
            // typeName: data.name,
            // typeCost: data.value,
            typeDetail: detailList[i],
          }}
        >
          <div className="detail-box" key={data.name + i}>
            <div className="type">
              <div className="type-name">{data.name}</div>
              <div className="type-cost">{data.value.toLocaleString()}원</div>
            </div>
            {renderDetailList(detailList[i])}
          </div>
        </Link>
      );
    });

    return <div className="item-list">{renderList}</div>;
  };

  if (loading)
    return (
      <div
        className="diary"
        style={{
          width: "100vw",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        로딩중...
      </div>
    );

  return (
    <StyledDetailBlock>
      <div className="detail-list">
        <div className="selected-detail">
          <div className="selected-date">
            {format(value, "M. d EEEEE", { locale: ko })}
          </div>
          <div className="selected-total">{totalMoney.toLocaleString()}원</div>
        </div>
        {renderList()}
      </div>
    </StyledDetailBlock>
  );
}

export default DetailList;

export function DetailItem({ item, ecoCnt }) {
  return (
    <div className="details-detail-container" key={item.id}>
      <div className="details-memo">
        {item.memo !== "" ? item.memo : item.type}
        {item.ecoList !== undefined &&
          item.ecoList !== null &&
          item.ecoList.map((data, i) => {
            return (
              <div
                key={data + i}
                className={`details-detail ${isEcoT(data.eco)}`}
              >
                {data.ecoDetail === "사용자 추가"
                  ? data.userAdd
                  : data.ecoDetail}
              </div>
            );
          })}
      </div>

      <div className={`details-cost ${isEco(ecoCnt)}`}>
        {item.income ? "+" : "-"}
        {item.cost.toLocaleString("ko-KR")}원
      </div>
    </div>
  );
}
