import React, { useState } from 'react';

import {StarOutlined, StarFilled} from '@ant-design/icons';

function ScrapButton(){
    const [action, setAction] = useState(null);

    const clickStar = () => {
        if (action === null) {
            setAction("scraped");
            fetchPostFunc();
          } else if (action === "scraped") {
            // 이미 스크랩 했는데 다시 눌렀을 때이므로 취소 로직
            setAction(null);
            fetchPostFunc2();
          }
    };

    //스크랩 누르기
    const userId = window.localStorage.getItem("userId");

    const fetchPostFunc = () => {
        console.log("post 시도 확인");
        //백으로 데이터 보내기
        fetch(
          `https://플랜잇.웹.한국:8080/api/starTalk/scrap/48`,
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

      //스크랩 취소
      const fetchPostFunc2 = () => {
        console.log("post 시도 확인");
        //백으로 데이터 보내기
        fetch(
          `https://플랜잇.웹.한국:8080/api/starTalk/deleteScrap/48`,
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
            { action === "scraped" ? <StarFilled style={{ color: 'yellow', fontSize: '20px'}} onClick={clickStar} />
            : <StarOutlined style={{ fontSize: '20px'}} onClick={clickStar} />}
        </div>
    );
}


export default ScrapButton;