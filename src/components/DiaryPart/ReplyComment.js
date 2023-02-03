// import React from 'react';
// import CommentAdd from './CommentAdd';

// function ReplyComment({commentList}) {

//     const renderReplyComment = () => {
//         commentList.map((comment, index) => (
//             <div>
//             <CommentAdd
//               key={`${index}${comment}`}
//               comment={comment}
//               index={index}
//               editCommentList={editCommentList} />
//             <ReplyComment commentList={commentList} />
//             </div>
//         ))
//     }

//     return (
//         <div>
//             <p style={{ fontSize: '14px', margin: '0', color: 'gray'}}>View 1 more comment(s)</p>
//         </div>
//     )
// }

// export default ReplyComment;