import React, { useState } from 'react';
import DiaryStyle from "../../pages/Diary/diary.module.css";
import LikeButton from "./LikeButton";

const WritingItem = ({ id, title, content, created_date }) => {
//   const [visible, setVisible] = useState(false);
  
//     return (
//     <div>
//       <div
//         onClick={() => {
//           setVisible(!visible);
//         }}>
//           <p>{new Date(created_date).toLocaleString()}</p>
//           <h2>{title}</h2>
//           <h4>미해결</h4>
//         </div>

//     {visible && 
//       <div>
//         제목 : <p>{title}</p>
//         내용 : <h2>{content}</h2>
//       </div>
//     }
//     </div>
//     );

  return (
    <>
      <div className={DiaryStyle.post_box}>
        <img src="img/profile.png" alt="profile"></img>
        <h1>닉네임</h1>
        <p>∙  {new Date(created_date).toLocaleString()}</p>
        <img className={DiaryStyle.star_img} src="img/favorite.png" alt="favorite"></img>
      </div>

      <div className={DiaryStyle.text_box}>
        {content}
      </div>

      <div className={DiaryStyle.react_box}>
        <LikeButton></LikeButton>
        {/* <img src="img/heart.png" alt="heart"></img>
        <h1>0</h1>
        <img src="img/comment.png" alt="comment"></img>
        <h1>12</h1> */}
      </div>

      <div className={DiaryStyle.border_line}></div>
      </>
    )
  };
  
  export default WritingItem;