import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Modify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import HistorySample from "../../components/History/HistoryBack";
import { format } from "date-fns";
import { FiEdit3 } from "react-icons/fi";

import DateHeader from "../../components/DateHeader";
import Calendar from "../../components/CalendarPart/CalendarBody";
import { Modal } from "../../components/Modal/Modal";
import SelectType from "../../components/FloatingPart/SelectType";
import SelectEco from "../../components/FloatingPart/SelectEco";
import axios from "axios";

function StatisticsModify() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setmode] = useState("");
  const data = useLocation().state;

  const [mdate, setMDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const [type, setType] = useState({ type: "", emoji: "" });
  const [cate, setCate] = useState({ type: "", emoji: "" });
  const [memo, setMemo] = useState("");
  const [ecoList, setEcoList] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const [ecoTag, setEcoTag] = useState([]);
  const [userTag, setUserTag] = useState([]);
  const [userEcoTag, setUserEcoTag] = useState([]);

  const userId = window.localStorage.getItem("userId");

  const fetchData = (e) => {
    e.preventDefault();
    window.alert("submit!");
    if (data.item.income) {
      axios({
        method: "POST",
        url: `https://플랜잇.웹.한국:8080/api/income/${data.item.id}/update`,
        headers: { userId: userId },
        data: {
          userId: userId,
          in_cost: parseInt(price),
          date: format(date, "yyyy-MM-dd"),
          in_type: cate.type,
          in_way: type.type,
          memo: memo,
        },
      });
    } else {
      axios({
        method: "POST",
        url: `https://플랜잇.웹.한국:8080/api/expenditure/${data.item.id}/update`,
        headers: { userId: userId },
        data: {
          userId: userId,
          ex_cost: parseInt(price),
          date: format(date, "yyyy-MM-dd"),
          exType: cate.type,
          exWay: type.type,
          memo: memo,
          ecoDetail: ecoTag,
          userAdd: userTag,
          eco: userEcoTag,
        },
      });
    }
  };

  useEffect(() => {
    if (data !== null) {
      const item = data.item;

      setDate(data.date);
      setPrice(item.cost);
      setType({ type: item.way, emoji: "" });
      setCate({ type: item.type, emoji: "" });
      setMemo(item.memo);
      if (item.ecoList !== null) {
        setEcoList(item.ecoList);
      }
    }
  }, [data]);

  const setArticle = (stype) => {
    let article = null;
    switch (stype) {
      case "date":
        article = (
          <>
            <div className="modify-modal-title">날짜</div>
            <DateHeader getDate={date} sendDate={(date) => setMDate(date)} />
            <Calendar
              selectedValue={date}
              currentValue={mdate}
              onChange={(date) => {
                setDate(date);
                setDisabled(false);
              }}
            />
          </>
        );
        break;
      case "type":
        article = (
          <>
            <div className="modify-modal-title">자산</div>
            <SelectType
              propType={type}
              type={0}
              buttons={false}
              sendData={(data) => {
                setType(data);
                closeModal();
                setDisabled(false);
              }}
            />
          </>
        );
        break;
      case "cate":
        article = (
          <>
            <p className="modify-modal-title">분류</p>
            <SelectType
              propType={cate}
              type={2}
              buttons={false}
              sendData={(data) => {
                setCate(data);
                closeModal();
                setDisabled(false);
              }}
            />
          </>
        );
        break;
      case "eco":
        article = (
          <>
            <div className="modify-modal-title">태그</div>
            <div className="modify-modal-eco-content">
              <SelectEco
                buttons={false}
                sendData={setEcoData}
                propData={{
                  ecoTag: ecoTag,
                  userTag: userTag,
                  userEcoTag: userEcoTag,
                }}
              />
            </div>
          </>
        );
        break;
      default:
        break;
    }

    return article;
  };

  const setEcoData = (data) => {
    let tempData = [...data[0], ...data[1], ...data[2]];
    setEcoList(tempData);
    let tempUserTag = [];
    let tempUserEcoTag = [];
    let tagData = tempData.map((arr) => {
      let eco = arr.isEco === "etc" ? "N" : arr.isEco === true ? "G" : "R";
      if (arr.id > 9) {
        tempUserTag.push(arr.tag);
        tempUserEcoTag.push(eco);
        return "사용자 추가";
      } else {
        return arr.tag;
      }
    });
    setEcoTag(tagData);
    setUserTag(tempUserTag);
    setUserEcoTag(tempUserEcoTag);
    setDisabled(false);
  };

  const openModal = (stype) => {
    setmode(stype);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="modify-container">
      <div className="modify-header">
        <HistorySample />
        <span className="modify-header-title">{cate.type}</span>
        <RiDeleteBin6Line className="modify-header-delete" />
      </div>
      <form onSubmit={fetchData}>
        <div className="modify-title">
          <input
            className="modify-content-title"
            value={memo !== null || memo !== "" ? memo : cate}
            onChange={(e) => setMemo(e.target.value)}
          />
          <FiEdit3 className="modify-edit-title-icon" />
        </div>
        <div className="modify-detail-block">
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              maskClosable={true}
              visible={false}
              closable={true}
              background={"#202632"}
            >
              {setArticle(mode)}
            </Modal>
          )}
          <div className="modify-detail">
            <p className="modify-detail-title">날짜</p>
            <input
              className="modify-detail-value"
              value={format(date, "yy년 MM월 dd일")}
              onClick={() => openModal("date")}
              readOnly
            />
          </div>

          <div className="modify-detail">
            <p className="modify-detail-title">자산</p>
            <input
              className="modify-detail-value"
              value={type.type}
              onClick={() => openModal("type")}
              readOnly
            />
          </div>

          <div className="modify-detail">
            <p className="modify-detail-title">금액</p>
            <input
              className="modify-detail-value price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="modify-detail">
            <p className="modify-detail-title">분류</p>
            <input
              className="modify-detail-value"
              value={cate.type}
              onClick={() => openModal("cate")}
              readOnly
            />
          </div>

          <div className="modify-detail">
            <p className="modify-detail-title">태그</p>

            <div
              className="modify-detail-value modify-eco"
              onClick={() => openModal("eco")}
            >
              {ecoList.length !== 0 &&
                ecoList.map((value) => {
                  return (
                    <button
                      type="button"
                      className={`modify-eco-tag ${
                        value.eco === "G"
                          ? "eco"
                          : value.eco === "R"
                          ? "neco"
                          : "etc"
                      }`}
                      key={value.id}
                      value={value.tag}
                    >
                      {value.tag !== undefined
                        ? value.tag
                        : value.ecoDetail === "사용자 추가"
                        ? value.userAdd
                        : value.ecoDetail}
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="modify-detail">
            <p className="modify-detail-title">메모</p>
            <input
              className="modify-detail-value"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        {!disabled && (
          <button type="submit" disabled={disabled} className="modify-save-btn">
            저장하기
          </button>
        )}
      </form>
    </div>
  );
}

export default StatisticsModify;
