import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MypageStyle from './Mypage.module.css';
import Footer from '../../components/Footer/Footer';
import HistorySample from '../../components/History/History';
import { FaChevronRight } from 'react-icons/fa';

import axios from "axios";

function MyPost() {

      const userId = window.localStorage.getItem("userId");

    //   const [postArr, setPostArr] = useState([]);
    //   const [postCnt, setPostCnt] = useState(0);

    //   const [loading, setloading] = useState(true);

    //   useEffect(() => {
    //     fetchData();
    //   }, []);

    //   const fetchData = async () => {
    //     console.log("게시글 조회 시도");
    //     // 게시글 조회
    //     const response = await axios.get(
    //       `https://플랜잇.웹.한국:8080/api/starTalk/myPost`,
    //       {
    //         headers: { userId: userId },
    //       }
    //     )
    //     const data = await response.data;

    //     setPostArr(data.postList);
    //     //setPostCnt(data.postCount);
    
    //     if (data && data.length > 0) {
    //       console.log(data[0]);
    //     }
    //     setloading(false);
    //   };

    //   console.log(postArr);

    //   console.log(postArr[0].content);

      const [commentArr, setCommentArr] = useState([]);

      const [loading, setloading] = useState(true);

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        console.log("내가 쓴 댓글 조회 시도");
        // 게시글 조회
        const response = await axios.get(
          `https://플랜잇.웹.한국:8080/api/starTalk/myComment`,
          {
            headers: { userId: userId },
          }
        )
        const data = await response.data;

        setCommentArr(data.commentList);
        //setPostCnt(data.postCount);
    
        if (data && data.length > 0) {
          console.log(data[0]);
        }
        setloading(false);
      };

        console.log(commentArr);

  return (
    <div className={ MypageStyle.container }>
        <div className={ MypageStyle.backBtn }>
            <HistorySample></HistorySample>
        </div>
        <div className={ MypageStyle.title }>
            내가 쓴 글
        </div>
        <div className={ MypageStyle.logout_box }>
          {/* 게시글 조회 테스트 : <p>{postArr[0].content}</p> */}
          {/* {postArr.map((it)=>(
                <div>
                    <div>작성자: {it.user}</div>
                    <div>내용: {it.content}</div>
                    <div>작성시간: {it.date}</div>
                </div>
            ))} */}
            내가 쓴 댓글 : 
        </div>
    </div>
  );

};

export default MyPost;
