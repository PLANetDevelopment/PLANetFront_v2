import React from "react";

import DiaryStyle from "../../pages/Diary/diary.module.css";
import HistorySample from "../../components/History/HistoryBackHome";
import { FiShare } from "react-icons/fi";

//게시물 보기
function PostView() {

  return (
    <div className={DiaryStyle.container}>
      <div className={DiaryStyle.backBtn}>
        <HistorySample />
      </div>
      <div className={DiaryStyle.title_icon}>
        <FiShare />
      </div>
      <div className={DiaryStyle.drop_box}>
        <button className={DiaryStyle.drop_box_category}>
            나의 플랜잇
        </button>
      </div>
    </div>
  );
}

export default PostView;