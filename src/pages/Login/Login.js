import React from "react";
import LoginStyle from "./Login.module.css";
import logo from "../../components/LoginPart/img/Group 345.png";
import planet from "../../planet/1-2.json";
import Lottie from "react-lottie";
import google from "../../components/LoginPart/img/login_google.png";
import naver from "../../components/LoginPart/img/login_naver.png";
import kakao from "../../components/LoginPart/img/login_kakao.png";

const API_KEY = process.env.REACT_APP_API_URL;
const REDIRECT_URI = "https://main.d2f9fwhj50mv28.amplifyapp.com/oauth";

function Login() {
    const lottieOptions = {
        animationData: planet,
        loop: true,
        autoplay: true,
        rendererSettings: {
            className: "add-class", // svg에 적용
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <section className={LoginStyle.content}>
            <div className={LoginStyle.container}>
                <img src={logo} className={LoginStyle.logo} alt="로고" />

                <div className={LoginStyle.planet}>
                    <Lottie
                        options={lottieOptions}
                        isClickToPauseDisabled={false}
                        style={{
                            width: "98%",
                            height: "98%",
                            maxWidth: "400px",
                        }} // svg의 부모 div에 적용
                        eventListeners={[
                            {
                                eventName: "complete",
                                callback: () => console.log("the animation completed"),
                            },
                        ]}
                    />
                </div>

                <p>
                    지구를 위한 건강한 소비생활 <br />
                    지금 플랜잇과 시작해볼까요? 🌱
                </p>
            </div>

            <div className={LoginStyle.login}>
                <p>아이디와 비밀번호 없이 간편하게 로그인할 수 있어요!</p>
            </div>
            <div className={LoginStyle.loginButton}>
                {/* <a
          alt="구글로 로그인하기"
          href="http://ec2-3-39-87-115.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google"
        >
          <img src={google} />
        </a>
        <a
          alt="네이버로 로그인하기"
          href="http://ec2-3-39-87-115.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver"
        >
          <img src={naver} />
        </a> */}
                <a alt="카카오로 로그인하기" href={KAKAO_AUTH_URI}>
                    <img src={kakao} />
                </a>
            </div>
        </section>
    );
}

export default Login;
