import React from "react";

import DiaryStyle from "../../pages/Diary/diary.module.css";

//인기게시글 컴포넌트
function PostList() {
  return (
  <>
    <div className={DiaryStyle.postList}>
      {/* 카테고리 */}
      <p>나의 플랜잇</p>
      {/* 제목, 대표사진 */}
      <h1>높아진 온도에 급격히 증가하는 러브버그 개체 수, 그것이 궁금하다 👀</h1>
      <img src="img/mainpostimg.png" alt="postImg"></img>
      {/* 날짜 */}
      <div className={DiaryStyle.post_view_box}>
        <p>2022. 07. 15</p>
        <img src="img/view.png" alt="view"></img>
        <p>1,429</p>
      </div>
    </div>
    <div className={DiaryStyle.border_line}></div>
  </>
  );
}

export default PostList;