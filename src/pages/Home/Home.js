import React, { useState, useEffect } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";
import { useQueryClient, useQuery } from "react-query";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import homeStyle from "./Home.module.css";
import { FiSettings, FiUser, FiEdit3 } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import high from "../../planet/1-2.json";
import highmid from "../../planet/1-2.json";
import low from "../../planet/4-2.json";
import mid from "../../planet/3-2.json";
import Lottie from "react-lottie";
import { format } from "date-fns";
import { EditName } from "../../components/Home/EditName";
import logo from "./img/PLANet.png";
import zero from "./img/Mask.png";
import { Modal } from "../../components/Modal/Modal";
import { QuestionModal } from "../../components/Home/QuestionModal";

const fetchData = async (userId) => {
  const response = await axios.get(
    `https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api/main/2022/${format(
      new Date(),
      "M"
    )}`,
    { headers: { userId: userId } }
  );
  const data = await response.data;
  return data;
};

const lottieOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    className: "add-class", // svg에 적용
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Home({ activeHome }) {
  const [message, setMessage] = useState(0);
  const [userName, setUserName] = useState("행성 1234호");
  const [income, setIncome] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [ecoPercentage, setEcoPercentage] = useState(0);

  const [position2, setposition2] = useState(0);

  const currentDate = new Date();
  const userId = window.localStorage.getItem("userId");
  const queryClient = useQueryClient();
  const results = useQuery({
    queryKey: "homeData",
    queryFn: () => fetchData(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (results.status === "success") {
      const messages = queryClient.getQueryData("homeData");

      setMessage(messages);
      setUserName(messages.userName === null ? "" : messages.userName);
      setIncome(messages.totalIncomeMonth);
      setExpenditure(messages.totalExpenditureMonth);
      setEcoPercentage(message.ecoPercentage);
    }
  }, [queryClient, results]);
  console.log(message);

  useEffect(() => {
    if (results.status === "success") {
      setLoading(false);
    }
  }, [results.status]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = (e) => {
    setposition2(e.clientY);
    setIsModalOpen2(true);
  };
  const closeModal2 = (text) => {
    setIsModalOpen2(false);
    setUserName(text);
  };

  if (ecoPercentage >= 0 && ecoPercentage < 25) {
    lottieOptions.animationData = low;
  } else if (ecoPercentage >= 25 && ecoPercentage < 50) {
    lottieOptions.animationData = mid;
  } else if (ecoPercentage >= 50 && ecoPercentage < 75) {
    lottieOptions.animationData = highmid;
  } else {
    lottieOptions.animationData = high;
  }
  // if (results.status === "loading") return <div>loading...</div>;
  return (
    <>
      <div className={homeStyle.contents}>
        <nav className={homeStyle.menu}>
          <Link to="/Login" className={activeHome}>
            <img alt="플랜잇 로고" src={logo} className={homeStyle.logo} />
          </Link>
          <Link to="/Setting">
            <FiSettings className={homeStyle.icon}></FiSettings>
          </Link>
          <Link to="/MyPage">
            <FiUser className={homeStyle.icon}></FiUser>
          </Link>
        </nav>
        <section className={homeStyle.profiles}>
          <div className={homeStyle.main}>
            <div className={homeStyle.nickname}>
              {!loading ? userName : "ㅤㅤㅤㅤㅤㅤ"}
              <FiEdit3
                className={homeStyle.icon}
                alt="닉네임 변경"
                onClick={(e) => openModal2(e)}
              ></FiEdit3>
              {isModalOpen2 && (
                <EditName
                  className={position2}
                  onClose={closeModal2}
                  maskClosable={true}
                  visible={true}
                  state={userName}
                ></EditName>
              )}
            </div>

            <div>
              <div
                className={homeStyle.question_container}
                onClick={(e) => openModal(e)}
              >
                <AiOutlineQuestionCircle className={homeStyle.question} />
              </div>

              <div className={homeStyle.planet}>
                {income === 0 && expenditure === 0 ? (
                  <div>
                    <img alt="만들어지지 않은 행성" src={zero} />
                    <p>
                      {results.status === "loading"
                        ? "행성을 탐색하는 중..."
                        : "아직 행성이 만들어지지 않았어요!\n지금 바로 가계부를 작성해보세요"}
                    </p>
                  </div>
                ) : (
                  <Lottie
                    options={{ ...lottieOptions }}
                    eventListeners={[
                      {
                        eventName: "complete",
                        callback: () => console.log("the animation completed"),
                      },
                    ]}
                    isClickToPauseDisabled={true}
                  ></Lottie>
                )}
              </div>

              <div>
                {isModalOpen && (
                  <Modal
                    onClose={closeModal}
                    maskClosable={true}
                    visible={true}
                    closable={true}
                    background={false}
                  >
                    <QuestionModal />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className={homeStyle.monthly}>
          <div className={homeStyle.month}>
            <div className="header row flex-middle">
              <div className="col col-center">
                <span>{format(currentDate, "M월")}</span>
              </div>
            </div>
          </div>
          {/* <Link to="/StatisticsView" className={activeHome}> */}
          <IoIosArrowForward className={homeStyle.history}></IoIosArrowForward>
          {/* </Link> */}
          <div className={homeStyle.income}>
            수입 <h1>{!loading ? income.toLocaleString() : 0}원</h1>
          </div>
          <div className={homeStyle.expend}>
            지출 <h1>{!loading ? expenditure.toLocaleString() : 0}원</h1>
          </div>
        </section>
        <section className={homeStyle.etc}>
          <div className={homeStyle.box}>
            <Link to="/EcoMission" className={activeHome}>
              <IoIosArrowForward className={homeStyle.btn}></IoIosArrowForward>
            </Link>
            <p className={homeStyle.box_text}>
              데일리
              <br /> 에코 미션
            </p>
          </div>
          <div className={homeStyle.box}>
            <Link to="/statistics" className={activeHome}>
              <IoIosArrowForward className={homeStyle.btn}></IoIosArrowForward>
            </Link>
            <p className={homeStyle.box_text}>
              월간
              <br /> 플랜잇
            </p>
          </div>
        </section>
        <section>
          <Link to="/FloatingPage" className={activeHome}>
            <div className={homeStyle.floating}>
              <HiOutlinePlus className={homeStyle.plus} />
            </div>
          </Link>
        </section>
        <Footer activeMenu="home">
          <div>홈</div>
        </Footer>
      </div>
    </>
  );
}

export default Home;

Home.defaultProps = {
  income: 0,
  expenditure: 0,
  userName: "",
  ecoPercentage: 0,
};

const message = {
  userName: "2000호",
  totalIncomeMonth: 0,
  totalExpenditureMonth: 0,
  ecoPercentage: 0.0,
  noEcoPercentage: 100.0,
};
