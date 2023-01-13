import React, { useState } from 'react';

import {HeartOutlined, HeartFilled} from '@ant-design/icons';

function LikeButton(){
    const [action, setAction] = useState(null);

    const [isChecked, setIsChecked] = useState(false);
    const [notice, setNotice] = useState('');

    const clickHeart = () => {
        // setIsChecked(!isChecked);
        // setNotice('1');

        // fetchPostFunc();
        // if(isChecked) {
        //     setIsChecked(!isChecked);
        //     setNotice('1');

        //      fetchPostFunc();
        // } else {
        //     setIsChecked(isChecked);
        //     setNotice('0');

        // }

        // if(isChecked === 'true'){
        //     setIsChecked(false);
        //     setNotice('');
        //     console.log('check 상태가 트루')
        // };
        // if(isChecked === 'false'){
        //     setIsChecked(true);
        //     setNotice('1');
        //     console.log('check 상태가 펄스')
        // };

        if (action === null) {
            setAction("liked");
            fetchPostFunc();
          } else if (action === "liked") {
            // 이미 좋아요를 눌렀는 데 다시 눌렀을 때이므로 취소 로직
            setAction(null);
            fetchPostFunc2();
          }
    };


    //좋아요 보내기
    const userId = window.localStorage.getItem("userId");

    const fetchPostFunc = () => {
        console.log("post 시도 확인");
        //백으로 데이터 보내기
        fetch(
          `https://플랜잇.웹.한국:8080/api/starTalk/saveLike/43`,
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

      const fetchPostFunc2 = () => {
        console.log("post 시도 확인");
        //백으로 데이터 보내기
        fetch(
          `https://플랜잇.웹.한국:8080/api/starTalk/deleteLike/43`,
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


    return(
        <div>
            {/* {isChecked ? 
            <HeartFilled style={{ color: 'red', fontSize: '20px'}} onClick={clickHeart} />
            : <HeartOutlined style={{ fontSize: '20px'}} onClick={clickHeart} /> }
            <p>{notice}</p> */}
            { action === "liked" ? <HeartFilled style={{ color: 'red', fontSize: '20px'}} onClick={clickHeart} />
            : <HeartOutlined style={{ fontSize: '20px'}} onClick={clickHeart} />}
        </div>
    );
}


export default LikeButton;