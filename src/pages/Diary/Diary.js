import React, { useState } from "react";
import { Link } from "react-router-dom";

import Post from "../../components/DiaryPart/Post";
import Footer from "../../components/Footer/Footer";
import DiaryStyle from "./diary.module.css";

const MAIN_DATA = [
  {
    id: "1",
    text: "전체",
    name: "first",
  },
  {
    id: "2",
    text: "나의 플랜잇",
    name: "second",
  },
  {
    id: "3",
    text: "나의 친환경 이야기",
    name: "third",
  },
  {
    id: "4",
    text: "Q&A",
    name: "fourth",
  },
];

function Diary() {
  const [search, setSearch] = useState(""); //검색창 변화 감지

  /*버튼마다 컴포넌트 변경하기*/
  const [content, setContent] = useState("1");

  const onChange = (e) => { //value값 변경
    setSearch(e.target.value)
  }

  const btnValueSetting = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className={DiaryStyle.container}>

      <div>
      <Link to="/SearchPost">
        <div className={DiaryStyle.topbar}>
          <img src="img/search.png" alt="search"></img> 
          <input type="text" placeholder="검색어를 입력해주세요" 
            value={search} onChange={onChange} />
        </div>
      </Link>
      <img className={DiaryStyle.profile} src="img/profile.png" alt="profile"></img>
      </div>

        <div className={DiaryStyle.drop_box}>
          {MAIN_DATA.map((data) => {
            return (
              <button
                className={`${
                  data.id === content
                    ? DiaryStyle.drop_box_selected
                    : DiaryStyle.drop_box_dimm
                }`}
                onClick={btnValueSetting}
                value={data.id}
                name={data.name}
                key={data.id}
              >
                {data.text}
              </button>
            );
          })}
        </div>

        <div className={DiaryStyle.border_line}></div>
        
        <Post></Post>

        <Link to="/WritingPage">
          <div className={DiaryStyle.writing}>
          <img className={DiaryStyle.pencil} src="img/pencil.png" alt="pencil"></img>
          </div>
        </Link>

        <Footer activeMenu="diary">
          <div>별별톡</div>
        </Footer>
      </div>
    </>
  );
}

export default Diary;
