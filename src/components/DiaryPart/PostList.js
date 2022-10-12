import React from "react";

import DiaryStyle from "../../pages/Diary/diary.module.css";

//인기게시글 컴포넌트
function PostList() {
  return (
    <>
      <div className={DiaryStyle.post_box}>
        <img src="img/profile.png" alt="profile"></img>
        <h1>닉네임</h1>
        <p>∙  6시간 전</p>
        <img className={DiaryStyle.star_img} src="img/favorite.png" alt="favorite"></img>
      </div>

      <div className={DiaryStyle.img_box}>
        <img src="img/photo.png" alt="photo"></img>
      </div>

      <div className={DiaryStyle.text_box}>
      나의 플랜잇 텍스트입니다. 나의 플랜잇 텍스트입니다. 나의 플랜잇 텍스트입니다. 나의 플랜잇 텍스트입니다...
      </div>

      <div className={DiaryStyle.react_box}>
        <img src="img/heart.png" alt="heart"></img>
        <h1>0</h1>
        <img src="img/comment.png" alt="comment"></img>
        <h1>12</h1>
      </div>

      <div className={DiaryStyle.border_line}></div>
    </>
  );
}

export default PostList;