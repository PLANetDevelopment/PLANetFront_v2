// import React, { useState } from "react";

// import DiaryStyle from "./diary.module.css";
// import PostList from "../../components/DiaryPart/PostList";
// import HistorySample from "../../components/History/HistoryBack";

// function SearchPost() {
//   const [search, setSearch] = useState(""); //검색창 변화 감지

//   const onChange = (e) => { //value값 변경
//     setSearch(e.target.value)
//   }

//   return (
//     <>
//       <div className={DiaryStyle.container}>

//         <div className={DiaryStyle.topbar2}>
//           <img src="img/search.png" alt="search"></img> 
//           <input type="text" placeholder="검색어를 입력해주세요" 
//             value={search} onChange={onChange} />
//         </div>

//         <div className={DiaryStyle.searchBackBtn}>
//           <HistorySample />
//         </div>

//         <div className={DiaryStyle.recent}>
//             <h1>최근 검색어</h1>
//             <p>모두 삭제</p>
//             <div className={DiaryStyle.recent_box}>
//                 <p>최근 검색어가 없어요</p>
//             </div>
//         </div>

//         <div className={DiaryStyle.border_deepline}></div>

//         <div className={DiaryStyle.post_list}>
//             <h1>인기 게시글</h1>
//         </div>

//         <PostList></PostList>
//         <PostList></PostList>

//       </div>
//     </>
//   );
// }

// export default SearchPost;
import React, { useState } from 'react';

const SearchPost = () => {
  const [comment, setComment] = useState('');
  const onChange = event => setComment(event.target.value);

  const [commentArray, setCommentArray] = useState([]);

  const onSubmit = event => {
    fetchPostFunc();

    event.preventDefault();
    if (comment === '') {
      return;
    }
    setCommentArray(commentValueList => [comment, ...commentValueList]);
    setComment('');
  };

  const commentValid = comment.length >= 1;

  const deleteComment = (e) => {
    // fetchPostFunc2();

    e.preventDefault();

    commentArray.filter((item) => {
    	return item.id !== Number(e.target.id);
    });
    
    setCommentArray({
    	commentArray: deleteComment,
    });
};

const editComment = (e) => {
  fetchPostFunc3();

  e.preventDefault();

  setComment('댓글 수정할게요...!');
  // if (comment === '댓글 수정할게요 제발!') {
  //   return;
  // }
  // setCommentArray(commentValueList => [comment, ...commentValueList]);
  // setComment('댓글 수정할게요 제발!');
};


  //댓글 보내기
const userId = window.localStorage.getItem("userId");
const fetchPostFunc = () => {
  console.log("post 시도 확인");
  //백으로 데이터 보내기
  fetch(
    `https://플랜잇.웹.한국:8080/api/starTalk/newComment/1`,
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

//댓글 삭제
const fetchPostFunc2 = () => {
  console.log("post 시도 확인");
  //백으로 데이터 보내기
  fetch(
    `https://플랜잇.웹.한국:8080/api/starTalk/deleteComment/5`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        userId: userId,
      },
      body: JSON.stringify({
        // comment: comment,
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
    `https://플랜잇.웹.한국:8080/api/starTalk/updateComment/4`,
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
    <div className="commentContainer" >

    <form id = {comment} onSubmit={onSubmit}>
      <input
      type="text"
      placeholder="댓글달기..."
      value={comment}
      onChange={onChange}
      />
      <button onClick={onSubmit}>게시</button>
    </form>

    <ul>
		{commentArray.map((value, index) => (
			<li key={index}>
				<span>PLANet 댓글 등록 Test! : </span>
                <span>{value}</span>
                <button onClick={editComment}>수정</button>
                <button onClick={deleteComment}>x</button>
            </li>
		))}
	</ul>
 </div>
  )
}

export default SearchPost;
