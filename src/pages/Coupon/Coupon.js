import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CouponStyle from "./Coupon.module.css";
import Footer from "../../components/Footer/Footer";
import HistorySample from "../../components/History/HistoryBack";
import { FaChevronRight } from "react-icons/fa";
import Modal from "../../components/CouponPart/CouponModal";

const MAIN_DATA = [
  {
    id: "1",
    text: "보유",
    name: "first",
  },
  {
    id: "2",
    text: "사용완료",
    name: "second",
  },
  {
    id: "3",
    text: "기간만료",
    name: "third",
  },
];

function Coupon() {
  //쿠폰 누르면 나오는 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [couponArr, setCouponArr] = useState([]);
  const [couponCnt, setCouponCnt] = useState(0);

  const [loading, setloading] = useState(true);
  const userId = window.localStorage.getItem("userId");

  const [current, setCurrent] = useState({});
  /*버튼마다 컴포넌트 변경하기*/
  const [content, setContent] = useState("1");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`https://플랜잇.웹.한국:8080/api/coupon`, {
      headers: { userId: userId },
    });
    const data = await response.data;

    // const data = data2;
    setCouponArr(data.couponDtos);
    setCouponCnt(data.couponCount);

    if (data && data.length > 0) {
      console.log(data[0]);
    }
    setloading(false);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = (item, available) => {
    if (item.availability !== available) {
      let index = couponArr.findIndex((c) => c.cno === item.cno);
      let copyArr = [...couponArr];
      if (index !== -1) {
        copyArr[index] = { ...copyArr[index], availability: false };
      }
      setCouponArr(copyArr);
      setCouponCnt(parseInt(couponCnt) - 1);
    }
    setIsModalOpen(false);
  };

  const btnValueSetting = (e) => {
    setContent(e.target.value);
  };

  const getComponent = (id) => {
    let payload = "";
    let functions = "";
    switch (id) {
      case "1":
        functions = (it) => it.availability === true;
        break;
      case "2":
        functions = (it) =>
          it.availability === false && it.expiration === false;
        break;
      case "3":
        functions = (it) => it.expiration === true;
        break;
      default:
        break;
    }
    payload = couponArr
      .filter((it) => functions(it))
      .map((famous) => (
        <CouponItem
          key={famous.cno}
          data={famous}
          availability={famous.availability}
          setContent={(data) => setCurrent(data)}
          openModal={openModal}
        />
      ));

    return <div className={CouponStyle.coupon_use_box}>{payload}</div>;
  };

  return (
    <div className={CouponStyle.container}>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          maskClosable={true}
          visible={false}
          closable={true}
          background={"#202632"}
          className="ModalInner"
          current={current}
        />
      )}
      <div className={CouponStyle.backBtn}>
        <HistorySample />
      </div>
      <div className={CouponStyle.title}>MY 쿠폰함</div>
      <Link to="/CouponJoin" style={{ textDecoration: "none", color: "white" }}>
        <div className={CouponStyle.coupon_box}>
          쿠폰 등록
          <FaChevronRight className={CouponStyle.info_icon} />
        </div>
      </Link>
      <div className={CouponStyle.coupon_detail_box}>
        <h1>
          현재 사용가능한 쿠폰 <b style={{ color: "#00C982" }}>{couponCnt}</b>
          장이 남았어요
        </h1>

        <div className={CouponStyle.drop_box}>
          {MAIN_DATA.map((data) => {
            return (
              <button
                className={`${
                  data.id === content
                    ? CouponStyle.drop_box_selected
                    : CouponStyle.drop_box_dimm
                }`}
                onClick={btnValueSetting}
                value={data.id}
                name={data.name}
                key={data.id}
              >
                {data.text}
              </button>
            );
          })}
        </div>
      </div>
      {couponCnt === 0 && content === "1" && (
        <div
          className="no-content"
          style={{
            color: "#636E75",
            marginTop: "40vh",
            textAlign: "center",
          }}
        >
          사용 가능한 쿠폰이 없어요!
        </div>
      )}
      {getComponent(content)}
      <Footer activeMenu="home">
        <div>홈</div>
      </Footer>
    </div>
  );
}

export default Coupon;

export function CouponItem({ data, availability, setContent, openModal }) {
  const onClickHandler = () => {
    setContent(data);
    openModal();
  };
  return (
    <div
      onClick={onClickHandler}
      className={
        availability
          ? CouponStyle.coupon_available
          : CouponStyle.coupon_expiration
      }
    >
      <div className={CouponStyle.coupon_dday}>D-{data.remainingDays}</div>
      <img src="img/coupon.png" alt="planet-coupon" />
      <h1>{data.coupon}</h1>
      <p>{data.discount}% 할인쿠폰</p>
    </div>
  );
}
