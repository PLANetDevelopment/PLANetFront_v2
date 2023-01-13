import React, { useState } from 'react';

const CommentAdd = ({ comment, index, editCommentList }) => {
    const [editing, setEditing] = useState(true);
    const [editCommentValue, setEditCommentValue] = useState('');

    const editComment = (e) => {
        setEditCommentValue(e.target.value);
    };

    const onClickEdit = (e) => {
        setEditing(!editing);
    };

    const onClickDelete = (e) => {
        fetchPostFunc2(); //삭제

        return e.target.parentElement.parentElement.parentElement.remove();
    }

    const onSubmit = (index, editCommentValue) => (e) => {
        e.preventDefault();
        setEditing(true);
        editCommentList(index, editCommentValue);

        fetchPostFunc3(); //수정
    };

    //Api test
    const userId = window.localStorage.getItem("userId");

    //댓글 삭제
    const fetchPostFunc2 = () => {
    console.log("post 시도 확인");
    //백으로 데이터 보내기
    fetch(
      `https://플랜잇.웹.한국:8080/api/starTalk/deleteComment/15`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          userId: userId,
        },
        body: JSON.stringify({
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };
  
  //댓글 수정
    const fetchPostFunc3 = () => {
    console.log("post 시도 확인");
    //백으로 데이터 보내기
    fetch(
      `https://플랜잇.웹.한국:8080/api/starTalk/updateComment/15`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          userId: userId,
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("wtw-token", response.token);
        }
      });
  };

    return (
    <>
    <div>
        <ul>
            <li>
                <div>
                    <span>{comment}</span>
                    {editing ? (
                        <div>
                            <button onClick={onClickEdit} type="button">
                                edit
                            </button>
                            <button onClick={onClickDelete} type="button">
                                x
                            </button>
                        </div>
                    ) : (
                        <div>
                            <input
                              placeholder={comment}
                              onChange={editComment}
                              value={editCommentValue}
                            />
                            <button onClick={onSubmit(index, editCommentValue)}>수정 완료</button>
                        </div>
                    )}
                </div>
            </li>
        </ul>
    </div>
    </>
    );
};

export default CommentAdd;