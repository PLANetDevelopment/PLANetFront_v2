import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/DiaryPart/SearchBar";
import SearchHistory from "../../components/DiaryPart/SearchHistory";
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

  //검색어 기능 설정
  //string은 map을 사용 할 수 없기때문에 object 형태로 변환 시키기 위해 parsing을 해줘야함
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  )

  //keyword에 변화가 일어날때만 랜더링
  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  //state를 다루는 함수는 handle 보통 많이 붙인다.

  //검색어 추가
  const handleAddKeyword = (text) => {
    console.log('text', text)
    const newKeyword = {
      id: Date.now(),
      text: text,
    }
    setKeywords([newKeyword, ...keywords])
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id != id
    })
    setKeywords(nextKeyword)
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([])
  }

  return (
    <>
      <div className={DiaryStyle.container}>

      <div>
        <div>
          <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
          <SearchHistory
            keywords={keywords}
            onClearKeywords={handleClearKeywords}
            onRemoveKeyword={handleRemoveKeyword}
          />
          {/* <img className={DiaryStyle.profile} src="img/profile.png" alt="profile"></img> */}
      </div>
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
