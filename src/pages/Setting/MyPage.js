import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MypageStyle from './Mypage.module.css';
import Footer from '../../components/Footer/Footer';
import HistorySample from '../../components/History/History';
import { FaChevronRight } from 'react-icons/fa';

function MyPage() {
  //계정 이름, 이메일, 로그인 여부 임의 설정
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profileImage, setProfileImage] = useState();

  const [kakaoLogin, setKakaoLogin] = useState(true);
  const [naverLogin, setNaverLogin] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserEmail(data.id);
      setUserName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);

      console.log(userName);
      console.log(userEmail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={ MypageStyle.container }>
        <div className={ MypageStyle.backBtn }>
            <HistorySample></HistorySample>
        </div>
        <div className={ MypageStyle.title }>
            마이페이지
        </div>
        <div className={ MypageStyle.name_box }>
            {/*소셜로그인 사용자 정보*/}
            <h1>{userName}</h1>
            <p>{userEmail}</p>
            {/* <h1>이수빈</h1>
            <p>20201961@sungshin.ac.kr</p> */}
        </div>
        <div className={ MypageStyle.login_box }>
            <h1>소셜로그인 연결</h1>

            {/* 소셜로그인 연결 여부 어떻게? */}
            <div className={ MypageStyle.kakao_icon }>
              {kakaoLogin === true ? 
              <img src="img/kakao_color.png" alt="kakao"></img> 
              : <img src="img/kakao.png" alt="kakao"></img>}
              {kakaoLogin === true ? <h2>연결완료</h2> : <h2>연결안됨</h2>}
            </div>

            <div className={ MypageStyle.naver_icon }>
              {naverLogin === true ? 
              <img src="img/naver_color.png" alt="naver"></img> 
              : <img src="img/naver.png" alt="naver"></img>}
              {naverLogin === true ? <h2>연결완료</h2> : <h2>연결안됨</h2>}
            </div>

            <div className={ MypageStyle.google_icon }>
              {googleLogin === true ? 
              <img src="img/google_color.png" alt="google"></img> 
              : <img src="img/google.png" alt="google"></img>}
              {googleLogin === true ? <h2>연결완료</h2> : <h2>연결안됨</h2>}
            </div>
        </div>

        <Link to="/Coupon" style={{ textDecoration : "none", color : "white" }}>
        <div className={ MypageStyle.coupon_box }>
            MY 쿠폰함
            <FaChevronRight className={MypageStyle.info_icon}/>
        </div>
        </Link>

        <Link to="/Inquiry" style={{ textDecoration : "none", color : "white" }}>
          <div className={ MypageStyle.logout_box }>
              <p>1:1 문의</p>
          </div>
        </Link>

        <Link to="/MyPost" style={{ textDecoration : "none", color : "white" }}>
          <div className={ MypageStyle.logout_box }>
              <p>내가 쓴 글</p>
          </div>
        </Link>

        <div className={ MypageStyle.logout_box } onClick={()=>{
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('userId');
            }}>
            <p>로그아웃</p>
        </div>

        <div className={ MypageStyle.drop_box }>
            <p>회원탈퇴</p>
        </div>
        
        <Footer activeMenu="home">
            <div>홈</div>
        </Footer>
    </div>
  );

};

export default MyPage;
