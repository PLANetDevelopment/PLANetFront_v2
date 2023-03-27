import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  .quote-container{
    margin-bottom:20px;
  }
  .quote-box {
    left: 16px;
    top: 115px;
    color: white;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 13px;
    padding: 13px;
    font-size:13px;
    line-height: 19px;
  }

  .moreButton,
  .author {
    color:#8D9096;
  }

  .moreButton {
    border:0;
    outline:0;
    background-color:transparent;
    font-size:12px;
  }

  .author {
    font-size:11px;
    line-height:15px;
  }

`;

function Quote({ value }) {
  let beforeStr = value.split("-");
  let text = beforeStr[0];
  let author = beforeStr[1];

  const [limit, setLimit] = useState(53);
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };

  const onClickMore = (str) => () => {
    setLimit(str.length);
  };

  return (
    <>
      <GlobalStyle />
      <div className="quote-container">
        <div className="quote-box">
          {toggleEllipsis(text, limit).string}
          {toggleEllipsis(text, limit).isShowMore && (
            <button className="moreButton" onClick={onClickMore(text)}>
              &nbsp;&nbsp;...더보기
            </button>
          )}
          <br />
          <span className="author">- {author}</span>
        </div>
      </div>
    </>
  );
}

export default Quote;
