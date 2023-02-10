import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;

function SingleComment(props) {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.commentValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //post하기
    fetchPostFunc();
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  //대댓글 보내기 (대댓글이라는 정보 넣어주기)
  const userId = window.localStorage.getItem("userId");

  const fetchPostFunc = () => {
    console.log("post 시도 확인");

    //백으로 데이터 보내기
    fetch(`https://플랜잇.웹.한국:8080/api/starTalk/newReply/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        userId: userId,
      },
      body: JSON.stringify({
        reply: commentValue,
      }),
    }).then((response) => {
      if (response.success) {
        //   alert("저장 완료");
        //   setCommentValue("");
      }
      if (response.token) {
        localStorage.setItem("wtw-token", response.token);
      }
    });

    console.log("대댓글 :", commentValue);
  };

  return (
    <div>
      {/* 댓글 가져와서 뿌리기 */}
      {/* <Comment
        actions={actions}
        author={props.comment.user.nickname}
        Avatar={<Avatar src alt />}
        content={<p>{props.comment.comment}</p>}
      /> */}
      <Comment
        actions={actions}
        author="작자미상"
        Avatar={<Avatar src alt />}
        content={<p>{props.comment.comment}</p>}
      />

      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={commentValue}
            placeholder="대댓글을 작성해 주세요"
          />

          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
