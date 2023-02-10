import axios from "axios";
import React, { useState, useEffect } from "react";

import SingleComment from "./SingleComment";
// import ReplyComment from "./ReplyComment";

function Comment(props) {
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //post하기
    fetchPostFunc();
  };

  //댓글 보내기
  const userId = window.localStorage.getItem("userId");

  const fetchPostFunc = () => {
    props.refreshFunction(commentValue);
    setCommentValue("");

    console.log("post 시도 확인");

    //백으로 데이터 보내기
    fetch(`https://플랜잇.웹.한국:8080/api/starTalk/newComment/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        userId: userId,
      },
      body: JSON.stringify({
        comment: commentValue,
      }),
    })
      //   .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          //   alert("저장 완료");
          //   setCommentValue("");
          //   props.refreshFunction(commentValue);
        }
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };

  return (
    <>
      <div>
        <br />
        Replies
        <hr />
        <br />
        {/* Comment Lists */}
        {props.commentLists &&
          props.commentLists.map(
            (comment, index) => (
              <>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                />
                {/* <ReplyComment
                  parentCommentId={comment.id}
                  commentLists={props.commentLists}
                /> */}
              </>
            )
            //   !comment.responseTo && (
            //     <SingleComment
            //       refreshFunction={props.refreshFunction}
            //       comment={comment}
            //     />
            //   ) //대댓글이 아닌 애들만 출력
          )}
        {/* Root Comment Form */}
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleClick}
            value={commentValue}
            placeholder="댓글을 작성해 주세요"
          />

          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Comment;
