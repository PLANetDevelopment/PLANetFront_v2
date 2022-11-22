import React, { useState } from "react";

import DiaryStyle from "./diary.module.css";
import PostList from "../../components/DiaryPart/PostList";
import HistorySample from "../../components/History/HistoryBack";

function SearchPost() {
  const [search, setSearch] = useState(""); //검색창 변화 감지

  const onChange = (e) => { //value값 변경
    setSearch(e.target.value)
  }

  return (
    <>
      <div className={DiaryStyle.container}>

        <div className={DiaryStyle.topbar2}>
          <img src="img/search.png" alt="search"></img> 
          <input type="text" placeholder="검색어를 입력해주세요" 
            value={search} onChange={onChange} />
        </div>

        <div className={DiaryStyle.searchBackBtn}>
          <HistorySample />
        </div>

        <div className={DiaryStyle.recent}>
            <h1>최근 검색어</h1>
            <p>모두 삭제</p>
            <div className={DiaryStyle.recent_box}>
                <p>최근 검색어가 없어요</p>
            </div>
        </div>

        <div className={DiaryStyle.border_deepline}></div>

        <div className={DiaryStyle.post_list}>
            <h1>인기 게시글</h1>
        </div>

        <PostList></PostList>
        <PostList></PostList>

      </div>
    </>
  );
}

export default SearchPost;
