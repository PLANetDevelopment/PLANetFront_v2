import React, { useState, useEffect } from 'react';
import DiaryStyle from "../../pages/Diary/diary.module.css";
import LikeButton from "./LikeButton";

import { Link } from 'react-router-dom';

import ViewPost from '../../pages/Diary/ViewPost';

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

  // const [ dataList, setDataList ] = useState({WritingItem});

  // console.log(dataList);

  return (
    <>
    {/* <Link to={`/viewPost/${id}`} state={{data : dataList}}> */}
    {/* <Link to = {{
      pathname: `/viewPost/${id}`,
      state : {
        id: {id},
        title: {title},
        content: {content},
        created_date: {created_date},
      }
    }}> */}

<Link to={`/viewPost/${id}`} state= {{
  id: {id},
  title: {title},
  content: {content},
  created_date: {created_date},
}} >
      <div className={DiaryStyle.post_box}>
        <img src="img/profile.png" alt="profile"></img>
        <h2>닉네임</h2>
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
    </Link>

    {/* {
      dataList ? dataList.map((item, index) => {
        return (
          <>
          <Link to={`/postView/${item.id}`}>
          <div className={DiaryStyle.post_box}>
            <img src="img/profile.png" alt="profile"></img>
            <h2>닉네임</h2>
            <p>∙  {new Date(item.created_date).toLocaleString()}</p>
            <img className={DiaryStyle.star_img} src="img/favorite.png" alt="favorite"></img>
          </div>

          <div className={DiaryStyle.text_box}>
            {item.content}
          </div>

          <div className={DiaryStyle.react_box}>
            <LikeButton></LikeButton>
          </div>

          <div className={DiaryStyle.border_line}></div>
          </Link>
          </>
        )
      }) : ''
    } */}
    </>
    )
  };
  
  export default WritingItem;