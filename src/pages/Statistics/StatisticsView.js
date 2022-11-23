import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, parseISO, isSameMonth, endOfMonth } from "date-fns";
import "./Statistics.css";
import { IoIosArrowForward } from "react-icons/io";
import ko from "date-fns/locale/ko";
import DateHeader from "../../components/DateHeader";
import { DetailMemo, StatisticsWays } from "./StatisticsWays";
import "../../components/StatisticsPart/Dropbox.module.css";
import styled from "styled-components";
import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

const OPTIONS = [
  { value: "all", name: "전체" },
  { value: "income", name: "수입" },
  { value: "expend", name: "지출" },
];

const fetchData = async (userId, currentMonth) => {
  let date = isSameMonth(currentMonth, new Date())
    ? currentMonth
    : endOfMonth(currentMonth);
  const response = await axios.get(
    `https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api/statistics/total/${format(
      date,
      "yyyy"
    )}/${format(date, "M")}`,
    { headers: { userId: userId } }
  );
  const data = await response.data;
  return data;
};

function StatisticsView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState({});
  const [totalMonthIncome, setTotalMonthIncome] = useState(0);
  const [totalMonthExpenditure, setTotalMonthExpenditure] = useState(0);
  const [inMore, setInMore] = useState(true);
  const [exMore, setExMore] = useState(true);
  const [inDif, setInDif] = useState(0);
  const [exDif, setExDif] = useState(0);
  const [loading, setloading] = useState(true);
  const [detailDtoList, setDetailDtoList] = useState([]);
  const [selectOption, setSelectOptions] = useState("all");

  const userId = window.localStorage.getItem("userId");

  const wayEmoji = (way) =>
    way === "은행" ? "🏦" : way === "카드" ? "💳" : "💵";
  const DropBox2 = (props) => {
    const handleChange = (e) => {
      // event handler
      console.log(e.target.value);
      setSelectOptions(e.target.value);
      console.log(selectOption);
      console.dir(e);
    };
    return (
      <div className="SelectBoxWrapper">
        <select onChange={handleChange} value={selectOption}>
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

  // const fetchData = async () => {
  //   const response = await fetch(
  //     `/statistics/2022/3`,
  //     //${format(new Date(), "M")}
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   setMessage(data);
  //   setDetailDtoList(data.detailDtoList);
  // };

  // useEffect(() => {
  //   // fetchData();
  //   setMessage(data);
  //   setDetailDtoList(data.detailDtoList);
  //   // setloading(false);
  // }, []);

  const queryClient = useQueryClient();

  const results = useQuery({
    queryKey: "statisticsViewData",
    queryFn: () => fetchData(userId, currentMonth),
    enabled: !!userId,
    staleTime: 1000 * 5 * 60, // 5분
    cacheTime: Infinity, // 제한 없음
  });

  const fetchStat = useMutation({
    mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries("statisticsViewData"),
    onError: (error) => console.error(),
  });

  const onchangeDate = (date) => {
    setCurrentMonth(date);
    fetchStat.mutate(date);
  };

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData("statisticsViewData");

      setMessage(messages);
      setTotalMonthIncome(messages.totalMonthIncome);
      setTotalMonthExpenditure(messages.totalMonthExpenditure);
      setInMore(messages.inMore);
      setExMore(messages.exMore);
      setInDif(messages.inDif);
      setExDif(messages.exDif);
      setDetailDtoList(messages.detailDtoList);
    }
  }, [queryClient, results]);

  useEffect(() => {
    if (results.status === "success") {
      setloading(false);
    }
  }, [results.status]);

  if (results.status === "loading")
    return (
      <div
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
  if (results.status === "error")
    return (
      <div
        style={{
          width: "100vw",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        문제가 발생했습니다. 잠시 후에 다시 시도해주세요.
      </div>
    );
  return (
    <div className="static-detail-container">
      <DateHeader
        goBack={true}
        getDate={currentMonth}
        sendDate={(date) => setCurrentMonth(date)}
      />

      <div className="detail-box">
        <Link
          to={`/statisticsView/income/${format(currentMonth, "yyyy")}/${format(
            currentMonth,
            "M"
          )}`}
          state={{ name: "income" }}
          style={{ textDecoration: "none" }}
        >
          <div className="income-box">
            <p>수입</p>
            <IoIosArrowForward className="detail-icon" />
            <h1>{totalMonthIncome}원</h1>
          </div>
        </Link>
        <Link
          to={`/statisticsView/expend/${format(currentMonth, "yyyy")}/${format(
            currentMonth,
            "M"
          )}`}
          state={{ name: "expenditure" }}
          style={{ textDecoration: "none" }}
        >
          <div className="income-box">
            <p>지출</p>
            <IoIosArrowForward className="detail-icon" />
            <h1>{totalMonthExpenditure}원</h1>
          </div>
        </Link>
        <div className="balloon">
          <p>지난달 이맘때보다</p>
          <h1>
            약{" "}
            <b style={{ color: "#00C982" }}>
              {inDif}원 {inMore ? "더" : "덜"}
            </b>{" "}
            들어오고
          </h1>
          <h1>
            약{" "}
            <b style={{ color: "#00C982" }}>
              {exDif}원 {exMore ? "더" : "덜"}
            </b>{" "}
            썼어요
          </h1>
        </div>
      </div>

      <div className="line-box"></div>

      <div className="statistics-box">
        <div className="drop-box">
          <DropBox2 options={OPTIONS} defaultValue="all" />
        </div>

        {detailDtoList.map((data) => {
          return (
            <>
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
                  <>
                    {/* <p className="statistic-detail-list date">
                      { format(parseISO(data.date), "d일 EEEE", { locale: ko })}
                      {selectOption === "all" ? format(parseISO(data.date), "d일 EEEE", { locale: ko }) : (selectOption === "income" ? (value.income === true && format(parseISO(data.date), "d일 EEEE", { locale: ko })) : (value.income === false && format(parseISO(data.date), "d일 EEEE", { locale: ko })))
                      }
                    </p> */}

                    <Link
                      className="detail-link"
                      to={`/statisticsModify`}
                      style={{ textDecoration: "none" }}
                      state={{
                        item: value,
                        date: parseISO(data.date),
                      }}
                    >
                      {selectOption === "all" ? (
                        value.income === true ? (
                          <StyledDetailPageBlock>
                            <div>
                              <p className="statistic-detail-list date">
                                {format(parseISO(data.date), "d일 EEEE", {
                                  locale: ko,
                                })}
                              </p>
                              <div
                                key={value.id}
                                className="statistic-detail-list"
                              >
                                <span
                                  role="img"
                                  aria-label="something"
                                  className="stat-detail-icon"
                                >
                                  {wayEmoji(value.way)}
                                </span>
                                <p className="stat-detail-type">
                                  {value.memo === null
                                    ? value.type
                                    : value.memo}
                                </p>
                                <p className="stat-detail-money">
                                  {value.income ? "+" : "-"}
                                  {value.cost.toLocaleString()}원
                                </p>
                              </div>
                            </div>
                          </StyledDetailPageBlock>
                        ) : (
                          <StyledDetailPageBlock>
                            <div>
                              <p className="statistic-detail-list date">
                                {format(parseISO(data.date), "d일 EEEE", {
                                  locale: ko,
                                })}
                              </p>
                              <div
                                className="statistic-detail-list"
                                key={value.id}
                              >
                                <div className="stat-detail-icon">
                                  {wayEmoji(value.way)}
                                </div>
                                <DetailMemo item={value} ecoCnt={ecoCnt} />
                              </div>
                            </div>
                          </StyledDetailPageBlock>
                        )
                      ) : selectOption === "income" ? (
                        <StyledDetailPageBlock>
                          {value.income === true && (
                            <div>
                              <p className="statistic-detail-list date">
                                {format(parseISO(data.date), "d일 EEEE", {
                                  locale: ko,
                                })}
                              </p>
                              <div
                                key={value.id}
                                className="statistic-detail-list"
                              >
                                <span
                                  role="img"
                                  aria-label="something"
                                  className="stat-detail-icon"
                                >
                                  {wayEmoji(value.way)}
                                </span>
                                <p className="stat-detail-type">
                                  {value.memo === null
                                    ? value.type
                                    : value.memo}
                                </p>
                                <p className="stat-detail-money">
                                  {value.income ? "+" : "-"}
                                  {value.cost.toLocaleString()}원
                                </p>
                              </div>
                            </div>
                          )}
                        </StyledDetailPageBlock>
                      ) : (
                        <StyledDetailPageBlock>
                          {value.income === false && (
                            <div>
                              <p className="statistic-detail-list date">
                                {format(parseISO(data.date), "d일 EEEE", {
                                  locale: ko,
                                })}
                              </p>
                              <div
                                className="statistic-detail-list"
                                key={value.id}
                              >
                                <div className="stat-detail-icon">
                                  {wayEmoji(value.way)}
                                </div>
                                <DetailMemo item={value} ecoCnt={ecoCnt} />
                              </div>
                            </div>
                          )}
                        </StyledDetailPageBlock>
                      )}
                    </Link>
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default StatisticsView;

StatisticsView.defaultProps = {
  message: {
    totalMonthIncome: 0,
    totalMonthExpenditure: 0,
    inMore: true,
    exMore: true,
    inDif: 0,
    exDif: 0,
    detailDtoList: [],
  },
};
const data = {
  totalMonthIncome: 880,
  totalMonthExpenditure: 92000,
  inMore: true,
  exMore: true,
  inDif: 880,
  exDif: 92000,
  detailDtoList: [
    {
      date: "2022-03-04",
      detailDtoList: [
        {
          type: "생필품",
          way: "은행",
          cost: 32000,
          memo: "츄파츕스 사먹음",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "중고거래/나눔/기부",
              etcMemo: null,
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
            {
              eco: "R",
              ecoDetail: "식자재 낭비",
              etcMemo: null,
            },
          ],
          income: true,
        },
      ],
    },
    {
      date: "2022-03-20",
      detailDtoList: [
        {
          type: "마트",
          way: "현금",
          cost: 53000,
          memo: "츄파츕스 사먹음",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "중고거래/나눔/기부",
              etcMemo: null,
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
            {
              eco: "R",
              ecoDetail: "식자재 낭비",
              etcMemo: null,
            },
          ],
          income: false,
        },
      ],
    },
    {
      date: "2022-03-23",
      detailDtoList: [
        {
          type: "경조사/회비",
          way: "은행",
          cost: 7000,
          memo: "츄파츕스 사먹음",
          ecoList: [
            {
              eco: "G",
              ecoDetail: "중고거래/나눔/기부",
              etcMemo: null,
            },
            {
              eco: "G",
              ecoDetail: "비건식당 방문",
              etcMemo: null,
            },
            {
              eco: "R",
              ecoDetail: "식자재 낭비",
              etcMemo: null,
            },
          ],
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
    font-family: Pretendard;
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
