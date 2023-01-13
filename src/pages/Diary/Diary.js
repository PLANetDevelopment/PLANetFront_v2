import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import SearchBar from "../../components/DiaryPart/SearchBar";
import SearchHistory from "../../components/DiaryPart/SearchHistory";
import WritingPage from "./WritingPage";
import WritingList from "../../components/DiaryPart/WritingList";
import Footer from "../../components/Footer/Footer";
import DiaryStyle from "./diary.module.css";
import SearchPost from "./SearchPost.js"

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

const Diary = () => {
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

  //게시글 data 받아오기
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);

  const dataId = useRef(0);

  const onCreate = (title, content) => {
    const created_date = new Date().getTime();
    
    console.log(created_date);

    const newItem = {
      title,
      content,
      created_date,
      id: dataId.current,
    };

    dataId.current += 1;

    setData([newItem, ...data]);
    setForm(false);
  };

  //카테고리별 게시글 가져오기 api 테스트 => success
  // const userId = window.localStorage.getItem("userId");
  // const [loading, setloading] = useState(true);

  // const [categoryPostArr, setCategoryPostArr] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   console.log("Trying to get category post info");

  //   const response = await axios.get(
  //     `https://플랜잇.웹.한국:8080/api/starTalk/myPost`,
  //     {
  //       headers: { userId: userId },
  //     }
  //   );
  //   const data = await response.data;

  //   setCategoryPostArr(data);

  //   if (data && data.length > 0) {
  //     console.log(data[0]);
  //   }

  //   setloading(false);
  // };

  // console.log(categoryPostArr);

  return (
    <>
      <div className={DiaryStyle.container}>

      {!form &&<>
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

            {/* <SearchPost /> */}
            
            {/* <Post></Post> */}
            <div className={DiaryStyle.post_container}>
                {data.length === 0 ? <h1>내역없음</h1> : <WritingList writingList={data} />}
            </div>
    
            {/* <Link to="/WritingPage">
              <div className={DiaryStyle.writing}>
              <img className={DiaryStyle.pencil} src="img/pencil.png" alt="pencil"></img>
              </div>
            </Link> */}


              <div className={DiaryStyle.writing} onClick={() => setForm(true)}>
                <img className={DiaryStyle.pencil} src="img/pencil.png" alt="pencil"></img>
              </div>

    
            <Footer activeMenu="diary">
              <div>별별톡</div>
            </Footer>
            </>
      }

      {form && <WritingPage onCreate={onCreate} />}
      </div>
    </>
  );
}

export default Diary;
