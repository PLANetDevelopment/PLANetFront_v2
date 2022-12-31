import React from 'react';
import './Popup.css';

const Popup = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, submit } = props;

  const onSubmit = (e)=> {
    e.preventDefault();
    submit(e);
 }
 
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <main>{props.children}</main>
          <footer>
            <button className="submitNo" onClick={close}>
              아니요
            </button>
            <button type="submit" className="submitYes" onClick={submit}>
              예
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Popup;