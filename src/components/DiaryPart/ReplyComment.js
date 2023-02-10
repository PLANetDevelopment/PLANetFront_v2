import React, { useState, useEffect } from "react";

import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNum, setChildCommentNum] = useState(0);

  useEffect(() => {
    let commentNumber = 0;

    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNum(commentNumber);
  }, []);

  const renderReplyComment = (parentCommentId) => {
    props.commentList.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div>
            <SingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
            />
            <ReplyComment commentLists={props.commentLists} />
          </div>
        )}
      </>
    ));
  };

  return (
    <div>
      {childCommentNum > 0 && (
        <p style={{ fontSize: "14px", margin: "0", color: "gray" }} onClick>
          View {childCommentNum} more comment(s)
        </p>
      )}

      {renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
