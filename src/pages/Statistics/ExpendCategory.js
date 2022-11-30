import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";
import { IoIosArrowForward } from "react-icons/io";
import { emoji } from "../../assets/emoji";
import "./ExpendCategory.css";

const fetchData = async (userId, ecoData, currentMonth) => {
  // const response = await axios.get(
  //   `https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api/statistics/expenditure/2022/${format(
  //     currentMonth,
  //     "M"
  //   )}/category/${ecoData}`,
  //   { headers: { userId: userId } }
  // );
  // const data = await response.data;
  const data2 = [
    {
      exType: "식비",
      count: 4,
      percent: 80,
    },
    {
      exType: "생필품",
      count: 1,
      percent: 20,
    },
  ];
  return data2;
};

function ExpendCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { name, month } = useLocation().state;

  const [message, setMessage] = useState([]);

  const userId = window.localStorage.getItem("userId");

  const results = useQuery({
    queryKey: "category",
    queryFn: () => fetchData(userId, name, month),
    enabled: !!userId,
    staleTime: 1000 * 5 * 60, // 5분
    cacheTime: Infinity, // 제한 없음
  });

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData("category");
      setMessage(messages);
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
          {name === "ecoG" ? "친환경 " : "반환경 "}지출 카테고리
        </h1>
      </div>
      <div className="category-category">지출 카테고리별 소비</div>
      {message.length !== 0 &&
        message.map((data) => {
          return (
            <Link
              key={data.exType + data.percent}
              to={`./detail`}
              state={{
                exType: data.exType,
                emoji: emoji[data.exType],
                count: data.count,
                ecoData: name,
                month: month,
              }}
            >
              <div className="category-box" key={data.exType + data.percent}>
                <p className="emoji">{emoji[data.exType]} </p>
                <h2>
                  {data.exType}
                  <span style={{ opacity: 0.2 }}>{" | "}</span>
                  {data.percent}%
                </h2>
                <IoIosArrowForward className="detail-icon" />
                <h1 className="count">{data.count}개</h1>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default ExpendCategory;
