import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import DiaryStyle from "./diary.module.css";
import HistorySample from '../../components/History/HistoryBack';
import LikeButton from "../../components/DiaryPart/LikeButton.js"

import CommentAdd from "../../components/DiaryPart/CommentAdd.js"

const ViewPost = () => {

    const location = useLocation();
    console.log("이전 페이지에서 넘어온 값: " , location);

    const id = location.state.id.id;
    const title = location.state.title.title;
    const content = location.state.content.content;
    const created_date = location.state.created_date.created_date;

    //댓글 구현하기
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);

    const editCommentList = (index, value) => {
      const next = commentList.map((comment, i) => {
        if (index === i) return value;
        return comment;
      });
      setCommentList(next);
    }

    const onChange = (e) => {
      setComment(e.target.value);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        createComment(e);
      }
    }

    const createComment = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (comment === '') {
        return;
      }

      setCommentList([...commentList, comment]);
      setComment('');
    };
 
  return (
    <>
    <div className={DiaryStyle.container}>
      <div className={ DiaryStyle.backBtn }>
        <HistorySample /> 
      </div>

      <div className={DiaryStyle.post_view_box}>

        <h1>{title}</h1>

        <div className={DiaryStyle.post_view_box_2}>
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
        </div>

        {/* 댓글 구현 */}
        <div>
          {commentList.map((comment, index) => (
            <CommentAdd
              key = {`${index}${comment}`}
              comment = {comment}
              index = {index}
              editCommentList={editCommentList}
            />
          ))}

          <div>
            <input 
              onChange={onChange}
              onKeyDown={onKeyDown}
              id='comment'
              value={comment}
              placeholder='댓글을 작성하세요'
            />
            <button onClick={createComment} id='commentSubmit' type='submit'>게시</button>
          </div>

        </div>

      </div>
    </div>
    </>
  )
}

export default ViewPost;