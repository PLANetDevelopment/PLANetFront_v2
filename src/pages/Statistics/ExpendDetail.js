import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";
import "./ExpendDetail.css";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { useQueryClient, useQuery } from "react-query";

const fetchData = async (userId, category, ecoData) => {
  // const response = await axios.get(
  //   `https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api/statistics/expenditure/2022/${format(
  //     new Date(),
  //     "M"
  //   )}/${category}/${ecoData}`,
  //   { headers: { userId: userId } }
  // );
  // const data = await response.data;
  return data2;
};

function ExpendDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { exType, emoji, count, ecoData, month } = useLocation().state;

  const [message, setMessage] = useState([]);
  const [detailList, setDetailList] = useState([]);

  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const results = useQuery({
    queryKey: ["expendDetail", month, exType, ecoData],
    queryFn: () => fetchData(userId, month, exType, ecoData),
    enabled: !!userId,
    staleTime: 1000 * 5 * 60, // 5분
    cacheTime: Infinity, // 제한 없음
  });

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData([
        "expendDetail",
        month,
        exType,
        ecoData,
      ]);
      setMessage(messages);
      setDetailList(messages.typeDetailList);
    }
  }, [queryClient, results]);

  console.log(message);

  if (results.status === "loading" || results.status === "error")
    return (
      <div
        style={{
          width: "100vw",
          color: "#636E75",
          textAlign: "center",
          marginTop: "40vh",
        }}
      >
        {results.status === "loading"
          ? "로딩중..."
          : "문제가 발생했습니다. 잠시 후에 다시 시도해주세요."}
      </div>
    );

  return (
    <div className="container">
      <div className="header">
        <IoIosArrowForward
          className="gobackarrow"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="cateGory">
          {ecoData === "ecoG" ? "친환경 " : "반환경 "} 지출 카테고리
        </h1>
      </div>
      <div className="detailType">
        <div className="detailTypeRow">
          <p>
            {emoji} {exType}
          </p>
          <p style={{ fontWeight: "700" }}>{count}개</p>{" "}
        </div>
        <p
          style={{
            fontSize: "15px",
            color: "#566479",
            paddingLeft: "30px",
            paddingTop: "16px",
            paddingBottom: "20px",
            lineHeight: "18px",
          }}
        >
          총 지출 금액 {message.totalExpenditure?.toLocaleString()}원
        </p>
      </div>
      <div className="line-box" />

      {detailList.length !== 0 &&
        detailList.map((dayData, i) => {
          return (
            <div key={dayData.date + i} className="detailCellContainer">
              <div className="detailCellDate">
                {format(parseISO(dayData.date), "d일 EEEEE요일", {
                  locale: ko,
                })}
              </div>
              {dayData.detailDtoList?.map((detail, i) => {
                return (
                  <div className="detailCellDetail">
                    <div
                      style={{
                        backgroundColor:
                          ecoData === "ecoG" ? "#00C982" : "#566479",
                        width: "5px",
                        height: "5px",
                        borderRadius: "2.5px",
                        marginTop: "4px",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        maxWidth: "50%",
                        paddingLeft: "9px",
                        paddingRight: "29px",
                      }}
                    >
                      {detail.memo === "" ? detail.type : detail.memo}
                    </div>
                    <div className="detailCellEcolist">
                      {detail.ecoList?.map((eco) => {
                        return (
                          <p
                            style={{
                              lineHeight: "18px",
                              color: eco.eco === "G" ? "#00C982" : "#566479",
                            }}
                          >
                            {eco.ecoDetail}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default ExpendDetail;

const data2 = {
  eco: "R",
  exType: "식비",
  totalExpenditure: 48200,
  countEx: 5,
  typeDetailList: [
    {
      date: "2022-09-02",
      detailDtoList: [
        {
          type: "식비",
          way: "카드",
          id: 154,
          cost: 2900,
          memo: "Namoo에서 빵 사먹음",
          ecoList: [
            {
              eco: "R",
              ecoDetail: "일회용품 사용",
              userAdd: null,
            },
          ],
          income: false,
        },
      ],
    },
    {
      date: "2022-09-04",
      detailDtoList: [
        {
          type: "식비",
          way: "카드",
          id: 158,
          cost: 22500,
          memo: "혜림이랑 피자 먹음🍕",
          ecoList: [
            {
              eco: "R",
              ecoDetail: "일회용품 사용",
              userAdd: null,
            },
            {
              eco: "R",
              ecoDetail: "비닐봉투 소비",
              userAdd: null,
            },
          ],
          income: false,
        },
      ],
    },
  ],
};
