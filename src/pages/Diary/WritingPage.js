import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import DiaryStyle from "./diary.module.css";
import HistorySample from '../../components/History/HistoryBack';
import Uploader from "../../components/InquiryPart/Uploader";
import Popup from '../../components/InquiryPart/Popup';
import CategoryList from '../../components/DiaryPart/CategoryList';
import { Modal } from "../../components/DiaryPart/DiaryModal";
import { BsChevronDown } from "react-icons/bs";

const WritingPage = ({ onCreate }) => {
    //카테고리 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isopenModal = () => setIsModalOpen(true);
    const iscloseModal = () => setIsModalOpen(false);

    const [state, setState] = useState({
        title : "",
        content: "",
    });
    
      const titleInput = useRef();
      const contentTextarea = useRef();
    
      const handleChangeState = (e) => {
        setState({
          ...state,
          [e.target.name] : e.target.value,
        });
      };
    
      const handleSubmit = () => {
        fetchPostFunc();

        console.log(state);
        onCreate(state.title, state.content);
    
        setState({
          title: "", content: "",
        });
    
        navigate('/Diary');
      };
    
      const navigate = useNavigate();
    
      //팝업 모달
      const [modalOpen, setModalOpen] = useState(false);
    
      const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

      const userId = window.localStorage.getItem("userId");
      const fetchPostFunc = () => {
        console.log("post 시도 확인");
        //백으로 데이터 보내기
        fetch(
          `https://플랜잇.웹.한국:8080/api/starTalk/newPost`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              userId: userId,
            },
            body: JSON.stringify({
              title: state.title,
              content: state.content,
              category: "planet",
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

      //게시글 조회 api test => success
      //게시글 정보 담아올 곳
      // const [postArr, setPostArr] = useState([]);
      // const [postCnt, setPostCnt] = useState(0);

      // const [loading, setloading] = useState(true);

      // useEffect(() => {
      //   fetchData();
      // }, []);

      // const fetchData = async () => {
      //   console.log("게시글 조회 시도");
      //   // 게시글 조회
      //   const response = await axios.get(
      //     `https://플랜잇.웹.한국:8080/api/starTalk`,
      //     {
      //       headers: { userId: userId },
      //     }
      //   )
      //   const data = await response.data;

      //   setPostArr(data.postList);
      //   //setPostCnt(data.postCount);
    
      //   if (data && data.length > 0) {
      //     console.log(data[0]);
      //   }
      //   setloading(false);
      // };

      // console.log(postArr[0]);

  return (
    <>
    <div className={ DiaryStyle.container }>


      {/* 게시글 조회 테스트 : <p>{postArr[0]}</p> */}
      {/* <TestList test={postArr[0]} /> */}

        <div className={ DiaryStyle.backBtn }>
          <HistorySample /> 
          {/* 이전 버튼 제대로 작동 안함 페이지 덮어써서! 이거 Link로 고쳐두자 */}
        </div>

        <div className={ DiaryStyle.title }>
            글 쓰기
        </div>

        <div className={ DiaryStyle.inquiry }>

          <div className={ DiaryStyle.category }>
            <p>챌린지 참여</p>

            {isModalOpen && (
            <Modal
              onClose={iscloseModal}
              maskClosable={true}
              visible={false}
              closable={true}
              background={"#202632"}
              className="ModalInner"
            >

              <CategoryList></CategoryList>

            </Modal>
           )}
           <button onClick={isopenModal} className={ DiaryStyle.category_btn }>
            <BsChevronDown />
           </button>
          </div>

          <div className={ DiaryStyle.line_box }></div>

          <div className={ DiaryStyle.time_info_box }>
              {/* <h1>제목</h1>
              <input
                ref={titleInput}
                type="text"
                name="title"
                value={state.title}
                placeholder='제목을 입력하세요'
                onChange={handleChangeState}
              /> */}

              {/* <h1>내용</h1> */}
              <textarea
                ref={contentTextarea}
                type="text"
                name="content"
                value={state.content}
                placeholder='나누고 싶은 이야기가 있으신가요?'
                onChange={handleChangeState}
              />

          </div>

          <div className={ DiaryStyle.upload_box }>
              <h1>사진</h1>
              <Uploader />
          </div>
          
        </div>
        
        <div className={ DiaryStyle.inquiry_submit_btn }>
          <button onClick={openModal}>등록하기</button>
          <Popup open={modalOpen} close={closeModal} submit={handleSubmit}>
            문의를 등록하시겠습니까?
          </Popup>
        </div>
    </div>
    </>
  );
}

export default WritingPage;
