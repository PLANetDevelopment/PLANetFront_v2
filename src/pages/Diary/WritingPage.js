import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import DiaryStyle from "./diary.module.css";
import HistorySample from '../../components/History/HistoryBack';
import Uploader from "../../components/InquiryPart/Uploader";
import Popup from '../../components/InquiryPart/Popup';

function WritingPage() {
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
        setState({
          title: "", content: "",
        });
    
        navigate('/Diary');
      };
    
      const navigate = useNavigate();
    
      const [modalOpen, setModalOpen] = useState(false);
    
      const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

  return (
    <>
    <div className={ DiaryStyle.container }>
        <div className={ DiaryStyle.backBtn }>
            <HistorySample></HistorySample>
        </div>

        <div className={ DiaryStyle.title }>
            게시글 쓰기
        </div>

        <div className={ DiaryStyle.inquiry }>

          <div className={ DiaryStyle.category }>
            <p>카테고리 선택</p>
          </div>

          <div className={ DiaryStyle.line_box }></div>

          <div className={ DiaryStyle.time_info_box }>
              <h1>제목</h1>
              <input
                ref={titleInput}
                type="text"
                name="title"
                value={state.title}
                placeholder='제목을 입력하세요'
                onChange={handleChangeState}
              />
              <h1>내용</h1>
              <textarea
              ref={contentTextarea}
                type="text"
                name="content"
                value={state.content}
                placeholder='내용을 입력하세요 (0/1000)'
                onChange={handleChangeState}
              />
              
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
