import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "./Statistics.css";
import DateHeader from "../../components/DateHeader";
import ko from "date-fns/locale/ko";
import HistorySample from "../../components/History/HistoryBack";
import styled from "styled-components";

const isEco = (ecoCnt) => (ecoCnt > 0 ? "eco" : ecoCnt < 0 ? "neco" : "etc");
const isEcoT = (eco) => (eco === "G" ? "eco" : eco === "R" ? "neco" : "etc");

export function DetailMemo({ item, ecoCnt }) {
  console.log(item);
  return (
    <>
      <div
        className="stat-detail-type"
        onClick={(e) => console.log(e.target.value)}
        key={item.id}
      >
        {item.memo !== null ? item.memo : item.type}
        {item.ecoList !== undefined &&
          item.ecoList !== null &&
          item.ecoList.map((data) => {
            return (
              <div className={`details-detail ${isEcoT(data.eco)}`}>
                {data.ecoDetail === "기타" ? (
                  <div style={{ color: "#939393" }}> {data.etcMemo} </div>
                ) : data.eco === "G" ? (
                  <div style={{ color: "#00C982" }}> {data.ecoDetail} </div>
                ) : (
                  <div style={{ color: "#566479" }}> {data.ecoDetail} </div>
                )}
              </div>
            );
          })}
      </div>

      {ecoCnt > 0 ? (
        <div
          className={`stat-detail-money ${isEco(ecoCnt)}`}
          style={{ color: "#00C982" }}
        >
          {item.income ? "+" : "-"}
          {item.cost.toLocaleString("ko-KR")}원
        </div>
      ) : ecoCnt < 0 ? (
        <div
          className={`stat-detail-money ${isEco(ecoCnt)}`}
          style={{ color: "#566479" }}
        >
          {item.income ? "+" : "-"}
          {item.cost.toLocaleString("ko-KR")}원
        </div>
      ) : (
        <div
          className={`stat-detail-money ${isEco(ecoCnt)}`}
          style={{ color: "#939393" }}
        >
          {item.income ? "+" : "-"}
          {item.cost.toLocaleString("ko-KR")}원
        </div>
      )}
    </>
  );
}
function StatisticsWays() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { way, year, month } = useParams();
  const income = way === "income" ? true : false;
  const nowMFormat = "M";
  const [message, setMessage] = useState(0);
  const [detailDtoList, setDetailDtoList] = useState([]);
  const [message2, setMessage2] = useState(0);
  const [detailDtoList2, setDetailDtoList2] = useState([]);
  const wayEmoji = (way) =>
    way === "은행" ? "🏦" : way === "카드" ? "💳" : "💵";

  const selectWay = useLocation().state;
  console.log(selectWay);
  const fetchData = async () => {
    const response = await fetch(
      `/statistics/${selectWay}/${format(currentMonth, "yyyy")}/${format(
        currentMonth,
        "M"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data);
        setDetailDtoList(data.detailDtoList);
      })
      .catch((error) => {
        console.log("error!");
        console.log(error);
      });
    const data = await response.json();
    setMessage(data);
    setDetailDtoList(data.detailDtoList);
  };
  useEffect(() => {
    if (year !== null || month !== null)
      setCurrentMonth(new Date(year, month - 1, 1));
    fetchData();
    // setMessage(tempData);
    // setDetailDtoList(tempData.detailDtoList);
    // setMessage2(tempData2);
    // setDetailDtoList2(tempData2.detailDtoList);
  }, [year, month]);

  console.log(detailDtoList);
  // console.log(detailDtoList[0].detailDtoList[2].ecoList);

  if (selectWay.name === "income") {
    return (
      <div className="static-detail-container">
        <DateHeader
          goBack={true}
          getDate={currentMonth}
          sendDate={(date) => setCurrentMonth(date)}
        />
        <div className="detail-box">
          <div className="income-detail-box">
            <p>
              {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"}{" "}
              총액
            </p>
            <h1>{message.totalMonthIncome}원</h1>
          </div>
          <div className="balloon3">
            <p>지난달 이맘때보다</p>
            <h1>
              약{" "}
              <b style={{ color: "#00C982" }}>
                {message.inDif}원 {message.inMore ? "더 " : "덜"}
              </b>
              들어왔어요
            </h1>
          </div>
        </div>

        <div className="line-box" />

        <div className="statistics-box">
          {detailDtoList.map((data) => {
            return (
              <>
                <p className="statistic-detail-list date">
                  {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
                </p>
                {data.detailDtoList.map((value) => {
                  return (
                    <Link
                      className="detail-link"
                      to={`/statisticsModify`}
                      style={{ textDecoration: "none" }}
                      state={{
                        item: value,
                        date: parseISO(data.date),
                      }}
                    >
                      <div key={value.id} className="statistic-detail-list">
                        <span
                          role="img"
                          aria-label="something"
                          className="stat-detail-icon"
                        >
                          {wayEmoji(value.way)}
                        </span>
                        <p className="stat-detail-type">
                          {value.memo === null ? value.type : value.memo}
                        </p>
                        <p className="stat-detail-money">
                          {value.income ? "+" : "-"}
                          {value.cost.toLocaleString()}원
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="static-detail-container">
        <DateHeader
          goBack={true}
          getDate={currentMonth}
          sendDate={(date) => setCurrentMonth(date)}
        />
        <div className="detail-box">
          <div className="income-detail-box">
            <p>
              {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"}{" "}
              총액
            </p>
            <h1>{message.totalMonthExpenditure}원</h1>
          </div>
          <div className="balloon2">
            <p>지난달 이맘때보다</p>
            <h1>
              약{" "}
              <b style={{ color: "#00C982" }}>
                {message.exDif}원 {message.exMore ? "더 " : "덜"}
              </b>
              썼어요
            </h1>
            <div className="green-Box">
              <p>
                친환경 지출에 약 <b style={{ color: "#FFFFFF" }}>30만원 더</b>{" "}
                썼어요
              </p>
              <p>
                반환경 지출에 약 <b style={{ color: "#FFFFFF" }}>30만원 더</b>{" "}
                썼어요
              </p>
            </div>
          </div>
        </div>

        <div className="line-box" />

        <div className="statistics-box">
          {detailDtoList2.map((data) => {
            return (
              <>
                <p className="statistic-detail-list date">
                  {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
                </p>
                {data.detailDtoList.map((value) => {
                  let ecoCnt = 0;
                  value.ecoList !== null &&
                    value.ecoList.forEach((value) => {
                      if (value.eco === "G") {
                        ecoCnt += 1;
                      } else if (value.eco === "R") {
                        ecoCnt -= 1;
                      }
                    });
                  return (
                    <Link
                      className="detail-link"
                      to={`/statisticsModify`}
                      style={{ textDecoration: "none" }}
                      state={{
                        item: value,
                        date: parseISO(data.date),
                      }}
                    >
                      <StyledDetailPageBlock>
                        <div className="statistic-detail-list" key={value.id}>
                          <div className="stat-detail-icon">
                            {wayEmoji(value.way)}
                          </div>
                          <DetailMemo item={value} ecoCnt={ecoCnt} />
                        </div>
                      </StyledDetailPageBlock>
                    </Link>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

StatisticsWays.defaultProps = {
  income: true,
};
const tempData = {
  totalMonthIncome: 884,
  totalMonthExpenditure: 92000,
  inMore: true,
  exMore: true,
  inDif: 880,
  exDif: 92000,
  detailDtoList: [
    {
      date: "2022-04-26",
      detailDtoList: [
        {
          id: 1,
          way: "현금",
          type: "경조사/회비",
          cost: 92503,
          memo: "여기는 수입이구요",
          ecoList: null,
          income: true,
        },
        {
          id: 2,
          way: "은행",
          type: "월급",
          cost: 1726000,
          memo: null,
          ecoList: null,
          income: true,
        },
        {
          id: 13,
          way: "카드",
          type: "생필품",
          cost: 4990,
          memo: "비누",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
          ],
          income: true,
        },
        {
          id: 14,
          way: "카드",
          type: "가전",
          cost: 50000,
          memo: "가스레인지",
          ecoList: null,
          income: true,
        },
      ],
    },
    {
      date: "2022-04-27",
      detailDtoList: [
        {
          id: 15,
          way: "은행",
          type: "생필품",
          cost: 92503,
          memo: "텀블러",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
          ],
          income: true,
        },
        {
          id: 16,
          way: "카드",
          type: "식비",
          cost: 92503,
          memo: "학식",
          ecoList: null,
          income: true,
        },
      ],
    },
  ],
};

const tempData2 = {
  totalMonthIncome: 880,
  totalMonthExpenditure: 92001,
  inMore: true,
  exMore: true,
  inDif: 880,
  exDif: 92003,
  detailDtoList: [
    {
      date: "2022-04-26",
      detailDtoList: [
        {
          id: 1,
          way: "현금",
          type: "경조사/회비",
          cost: 92503,
          memo: "지출입니동1",
          ecoList: null,
          income: false,
        },
        {
          id: 2,
          way: "은행",
          type: "월급",
          cost: 1726000,
          memo: null,
          ecoList: null,
          income: false,
        },
        {
          id: 13,
          way: "카드",
          type: "생필품",
          cost: 4990,
          memo: "비누",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
            {
              eco: "R",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
          ],
          income: false,
        },
        {
          id: 14,
          way: "카드",
          type: "가전",
          cost: 50000,
          memo: "가스레인지",
          ecoList: null,
          income: false,
        },
      ],
    },
    {
      date: "2022-04-27",
      detailDtoList: [
        {
          id: 15,
          way: "은행",
          type: "생필품",
          cost: 92503,
          memo: "텀블러",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "친환경 제품 구매",
              etcMemo: null,
            },
            {
              eco: "N",
              ecoDetail: "기타",
              etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
            },
          ],
          income: false,
        },
        {
          id: 16,
          way: "카드",
          type: "식비",
          cost: 92503,
          memo: "학식",
          ecoList: null,
          income: false,
        },
      ],
    },
  ],
};

const StyledDetailPageBlock = styled.div`
  background-color: rgb(var(--navy));
  width: 100vw;
  .detail-page {
    padding-bottom: 70px;
    background-color: rgb(var(--navy));
  }
  .detail-info-block {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    color: white;
    margin-bottom: 60px;
  }

  .selected-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin: 30px 0;
  }
  .forward-arrow {
    color: white;
    transform: rotate(180deg);
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .detail-info {
    display: flex;
    flex-direction: row;
    line-height: 16px;
    margin-bottom: 20px;
  }

  .detail-type {
    font-weight: 500;
    font-size: 18px;
  }
  .detail-cost {
    top: 15px;
    position: relative;
  }

  .detail-cost:after {
    position: absolute;
    content: "";
    width: 100vw;
    height: 0;
    left: -5%;
    border-bottom: 12px solid #000b21;
    opacity: 0.7;
  }

  .detail-info .detail-cost-label {
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: #ffffff;
    opacity: 0.5;
    margin-left: 1%;
  }

  .detail-info .detail-cost-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: white;
    margin-left: auto;
  }
  .detail-info .detail-cost-value.none {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(var(--mid-gray));
    opacity: 0.5;
  }

  .detail-div-list {
    color: white;
    width: 100%;
  }
  .detail-history {
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
    margin-left: 5%;
    margin-bottom: 20px;
  }

  .details {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 13px;
    margin-bottom: 13px;
  }
  .details-circle {
    margin-top: 3px;
    font-size: 8px;
  }
  .details-circle.none {
    color: transparent;
  }

  .details-circle.eco {
    color: rgb(var(--green));
  }

  .details-circle.neco {
    color: rgb(var(--mid-gray));
  }

  .details-detail-container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .details-memo {
    font-size: 15px;
    line-height: 16px;
    font-weight: 500;
  }
  .details-detail {
    font-size: 11px;
    line-height: 13px;
    margin-top: 7px;
    font-weight: 400;
  }
  .details-detail.eco {
    color: rgb(var(--green));
  }
  .details-detail.neco {
    color: rgb(var(--mid-gray));
  }
  .details-cost.eco {
    color: rgb(var(--green));
  }
  .details-cost.neco {
    color: rgb(var(--mid-gray));
  }
  .details-cost {
    font-size: 15px;
    font-weight: 400;
    margin-left: auto;
  }
`;

//const id = " user1@naver.com";

// const fetchData = () => {
//   fetch(
//     `/statistics/${way}/${id}/${format(currentMonth, "yyyy")}/${format(
//       currentMonth,
//       "M"
//     )}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       setDetailList(data.detailDtoList);
//     })
//     .catch((error) => {
//       console.log("error!");
//       console.log(error);
//     });
// };

export default StatisticsWays;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { format, parseISO } from "date-fns";
// import "./Statistics.css";
// import DateHeader from "../../components/DateHeader";
// import ko from "date-fns/locale/ko";
// import HistorySample from "../../components/History/HistoryBack";

// function StatisticsWays() {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const { way, year, month } = useParams();
//   const income = way === "income" ? true : false;
//   const nowMFormat = "M";
//   const [detailList, setDetailList] = useState(tempData);
//   const wayEmoji = (way) => (way === "은행" ? "🏦" : "카드" ? "💳" : "💰");

//   useEffect(() => {
//     if (year !== null || month !== null)
//       setCurrentMonth(new Date(year, month - 1, 1));
//   }, [year, month]);

//   return (
//     <div className="static-detail-container">
//       <DateHeader
//         goBack={true}
//         getDate={currentMonth}
//         sendDate={(date) => setCurrentMonth(date)}
//       />
//       <div className="detail-box">
//         <div className="income-detail-box">
//           <p>
//             {format(currentMonth, nowMFormat)}월 {income ? "수입" : "지출"} 총액
//           </p>
//           <h1>800,000원</h1>
//         </div>
//         <div className="balloon2">
//           <p>지난달 이맘때보다</p>
//           <h1>
//             약 <b style={{ color: "#00C982" }}>10만원 더</b>{" "}
//             {income ? "들어왔" : "썼"}어요
//           </h1>
//         </div>
//       </div>

//       <div className="line-box" />

//       <div className="statistics-box">
//         {detailList.map((data) => {
//           return (
//             <>
//               <p className="statistic-detail-list date">
//                 {format(parseISO(data.date), "d일 EEEE", { locale: ko })}
//               </p>
//               {data.detailDtoList.map((value) => {
//                 return (
//                   <div key={value.id} className="statistic-detail-list">
//                     <span
//                       role="img"
//                       aria-label="something"
//                       className="stat-detail-icon"
//                     >
//                       {wayEmoji(value.way)}
//                     </span>
//                     <p className="stat-detail-type">
//                       {value.memo === null ? value.type : value.memo}
//                     </p>
//                     <p className="stat-detail-money">
//                       {value.income ? "+" : "-"}
//                       {value.cost.toLocaleString()}원
//                     </p>
//                   </div>
//                 );
//               })}
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// StatisticsWays.defaultProps = {
//   income: true,
// };
// const tempData = [
//   {
//     date: "2022-04-26",
//     detailDtoList: [
//       {
//         id: 1,
//         way: "현금",
//         type: "경조사/회비",
//         cost: 92503,
//         memo: "income memo",
//         ecoList: null,
//         income: true,
//       },
//       {
//         id: 2,
//         way: "은행",
//         type: "월급",
//         cost: 1726000,
//         memo: null,
//         ecoList: null,
//         income: true,
//       },
//       {
//         id: 13,
//         way: "카드",
//         type: "생필품",
//         cost: 4990,
//         memo: "비누",
//         ecoList: [
//           {
//             eco: "G",
//             ecoDetail: "친환경 제품 구매",
//             etcMemo: null,
//           },
//           {
//             eco: "N",
//             ecoDetail: "기타",
//             etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//           },
//           {
//             eco: "G",
//             ecoDetail: "비건식당 방문",
//             etcMemo: null,
//           },
//         ],
//         income: false,
//       },
//       {
//         id: 14,
//         way: "카드",
//         type: "가전",
//         cost: 50000,
//         memo: "가스레인지",
//         ecoList: null,
//         income: false,
//       },
//     ],
//   },
//   {
//     date: "2022-04-27",
//     detailDtoList: [
//       {
//         id: 15,
//         way: "은행",
//         type: "생필품",
//         cost: 92503,
//         memo: "텀블러",
//         ecoList: [
//           {
//             eco: "G",
//             ecoDetail: "친환경 제품 구매",
//             etcMemo: null,
//           },
//           {
//             eco: "N",
//             ecoDetail: "기타",
//             etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//           },
//         ],
//         income: false,
//       },
//       {
//         id: 16,
//         way: "카드",
//         type: "식비",
//         cost: 92503,
//         memo: "학식",
//         ecoList: null,
//         income: false,
//       },
//     ],
//   },
// ];
//const id = " user1@naver.com";

// const fetchData = () => {
//   fetch(
//     `/statistics/${way}/${id}/${format(currentMonth, "yyyy")}/${format(
//       currentMonth,
//       "M"
//     )}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       setDetailList(data.detailDtoList);
//     })
//     .catch((error) => {
//       console.log("error!");
//       console.log(error);
//     });
// };

//export default StatisticsWays;
