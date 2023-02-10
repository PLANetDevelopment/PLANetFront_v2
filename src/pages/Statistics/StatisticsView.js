import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Statistics.css";
import { IoIosArrowForward } from "react-icons/io";

import DateHeader from "../../components/DateHeader";
import "../../components/StatisticsPart/Dropbox.module.css";

import { useQueryClient, useQuery, useMutation } from "react-query";
import InExItem from "../../components/StatisticsPart/InExItem";
import { isSameMonth, endOfMonth } from "date-fns";
import { getStatisticsView } from "../../api/statistics.api";

const OPTIONS = [
  { value: "all", name: "전체" },
  { value: "income", name: "수입" },
  { value: "expend", name: "지출" },
];

const fetchData = async (currentMonth) => {
  let date = isSameMonth(currentMonth, new Date())
    ? currentMonth
    : endOfMonth(currentMonth);
  const data = await getStatisticsView(date);
  return data;
};

function StatisticsView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [totalMonthIncome, setTotalMonthIncome] = useState(0);
  const [totalMonthExpenditure, setTotalMonthExpenditure] = useState(0);
  const [inMore, setInMore] = useState(true);
  const [exMore, setExMore] = useState(true);
  const [inDif, setInDif] = useState(0);
  const [exDif, setExDif] = useState(0);

  const [detailDtoList, setDetailDtoList] = useState([]);
  const [selectOption, setSelectOptions] = useState("all");

  const queryClient = useQueryClient();

  const results = useQuery({
    queryKey: "statisticsViewData",
    queryFn: () => fetchData(currentMonth),
    staleTime: 1000 * 5 * 60, // 5분
    cacheTime: Infinity, // 제한 없음
  });

  const fetchStat = useMutation({
    mutationFn: () => {},
    onSuccess: () => queryClient.invalidateQueries("statisticsViewData"),
    onError: (error) => console.error(),
  });

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData("statisticsViewData");

      setTotalMonthIncome(messages.totalMonthIncome);
      setTotalMonthExpenditure(messages.totalMonthExpenditure);
      setInMore(messages.inMore);
      setExMore(messages.exMore);
      setInDif(messages.inDif);
      setExDif(messages.exDif);
      setDetailDtoList(messages.detailDtoList);
    }
  }, [queryClient, results]);

  const handleChange = (e) => {
    setSelectOptions(e.target.value);
  };

  const onchangeDate = (date) => {
    setCurrentMonth(date);
    fetchStat.mutate(date);
  };

  const filterItems = (value) => {
    switch (selectOption) {
      case "all":
        return value;
      case "income":
        return value.income === true;
      case "expend":
        return value.income === false;
      default:
        return value;
    }
  };

  if ((results.status !== "success") | (results.status === "error"))
    return (
      <div style={errorStyle}>
        {results.status === "loading"
          ? "로딩중..."
          : "문제가 발생했습니다. 잠시 후에 다시 시도해주세요."}
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
        >
          <div className="inex-box">
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
        >
          <div className="inex-box">
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
              {inDif.toLocaleString()}원 {inMore ? "더" : "덜"}
            </b>{" "}
            들어오고
          </h1>
          <h1>
            약{" "}
            <b style={{ color: "#00C982" }}>
              {exDif.toLocaleString()}원 {exMore ? "더" : "덜"}
            </b>{" "}
            썼어요
          </h1>
        </div>
      </div>

      <div className="line-box" />

      <div className="statistics-option-box">
        <div className="selectBoxWrapper">
          <select onChange={handleChange} value={selectOption}>
            {OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                defaultValue={"all" === option.value}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {detailDtoList.map((data) => {
          let filteredItem = data.detailDtoList.filter(filterItems);
          if (filteredItem.length > 0)
            return (
              <div key={filteredItem[0].type + filteredItem[0].cost}>
                <InExItem date={data.date} items={filteredItem} />
              </div>
            );
          else return null;
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

const errorStyle = {
  width: "100vw",
  color: "#636E75",
  textAlign: "center",
  marginTop: "40vh",
};
// const data = {
//   totalMonthIncome: 884,
//   totalMonthExpenditure: 92000,
//   inMore: true,
//   exMore: true,
//   inDif: 880,
//   exDif: 92000,
//   detailDtoList: [
//     {
//       date: "2022-04-26",
//       detailDtoList: [
//         {
//           id: 1,
//           way: "현금",
//           type: "경조사/회비",
//           cost: 92503,
//           memo: "여기는 수입이구요",
//           ecoList: null,
//           income: true,
//         },
//         {
//           id: 2,
//           way: "은행",
//           type: "월급",
//           cost: 1726000,
//           memo: null,
//           ecoList: null,
//           income: true,
//         },
//         {
//           id: 13,
//           way: "카드",
//           type: "생필품",
//           cost: 4990,
//           memo: "비누",
//           ecoList: [
//             {
//               eco: "G",
//               ecoDetail: "친환경 제품 구매",
//               etcMemo: null,
//             },
//             {
//               eco: "N",
//               ecoDetail: "기타",
//               etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//             },
//             {
//               eco: "G",
//               ecoDetail: "비건식당 방문",
//               etcMemo: null,
//             },
//           ],
//           income: false,
//         },
//         {
//           id: 14,
//           way: "카드",
//           type: "가전",
//           cost: 50000,
//           memo: "가스레인지",
//           ecoList: null,
//           income: false,
//         },
//       ],
//     },
//     {
//       date: "2022-04-27",
//       detailDtoList: [
//         {
//           id: 15,
//           way: "은행",
//           type: "생필품",
//           cost: 92503,
//           memo: "텀블러",
//           ecoList: [
//             {
//               eco: "R",
//               ecoDetail: "친환경 제품 구매",
//               etcMemo: null,
//             },
//             {
//               eco: "N",
//               ecoDetail: "기타",
//               etcMemo: "평생 쓰는 물건 잃어버려서 재구매",
//             },
//           ],
//           income: false,
//         },
//         // {
//         //   id: 16,
//         //   way: "카드",
//         //   type: "식비",
//         //   cost: 92503,
//         //   memo: "학식",
//         //   ecoList: null,
//         //   income: true,
//         // },
//       ],
//     },
//   ],
// };
