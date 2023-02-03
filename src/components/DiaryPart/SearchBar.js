import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { FiSearch } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";

import axios from "axios";
import { Link } from 'react-router-dom'

const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #141b27;
  padding: 20px 18px 30px 18px;
  box-sizing: border-box;

  margin-bottom: 40px;
`

//Link태그의 스타일
//horizontalCenter 스타일 컴포넌트를 믹스인하여 속성값 전달
// const ArrowIcon = styled(Link)`
//   ${horizontalCenter}
//   left: 18px;
//   display: block;
//   width: 21px;
//   height: 18px;
//   background-position: -164px -343px;
//   vertical-align: top;
//   background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
//   background-size: 467px 442px;
//   background-repeat: no-repeat;
// `

// const SearchIcon = styled.span`
//   ${horizontalCenter}
//   right: 18px;
//   width: 24px;
//   height: 24px;
//   background-position: -356px -260px;ddd
//   display: inline-block;
//   overflow: hidden;
//   color: transparent;
//   vertical-align: middle;
//   background-image: url('/img/search.png');
//   background-size: 467px 442px;
//   background-repeat: dno-repeat;
// `

//글자를 입력하면 RemoveIcon이 나오게 되고 누르면 input의 value값이 사라집니다
const RemoveIcon = styled.span`
  ${horizontalCenter}
  right: 10px;
  width: 20px;
  height: 20px;
  background-position: -389px -29px;
  display: inline-block;
  overflow: hidden;
  color: transparent;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`

const InputContainer = styled.div`
  position: relative;
  width: 90%;
  background: #26272E;
  outline: none;
  border: 0;
  border-radius: 36px;

  padding: 3% 4%;
  float: left;
`

const Input = styled.input`
  font-family: 'pretendard';
  width: 88%;
  margin-left: 8%;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  border-radius: 36px;
  box-sizing: border-box;
  background: #26272E;
  outline: none;
  border: 0;
  padding: 2%;

  &::placeholder{
    color: #ffffff;
    opacity: 30%;
  }

  ${({ active }) =>
    active &&
    `
    padding-right: 25px; 
  `}
`

const SearchIcon = styled(FiSearch)`
  width: 18px;
  height: 18px;
  color: rgba(136, 136, 136, 1);
  position: absolute;
  margin-top: 1.5%;
`;

// const PencilIcon = styled(HiOutlinePencil)`
//   position: relative;
//   width: 18px;
//   height: 18px;
//   color: #fff;
//   float: right;

//   margin-top: 4%;
// `;

function SearchBar({ onAddKeyword }) {
  // 1. 검색어를 state 로 다루도록 변경
  // 2. 이벤트 연결
  // 3. Link to 설명

  //form을 관련 요소를 다룰때는 2-way 데이터 바인딩을 해줍니다! (input 의 value에 state를 넣는 것)
  const [keyword, setKeyword] = useState('')

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }
  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword);
      setKeyword('');
      fetchData();
    }
  }

  const handleClearKeyword = () => {
    setKeyword('')
  }

  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  const hasKeyword = !!keyword
{
    //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있습니다
    console.log(!!keyword)
  }

  //검색어 api test
  const [filesData, setFilesData] = useState();   //조회 결과 저장
  const [loading, setloading] = useState(true);

  const userId = window.localStorage.getItem("userId");

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    console.log("검색어 api 테스트 시도");

    const response = await axios.get(
      `https://플랜잇.웹.한국:8080/api/starTalk/retrieve?query=${keyword}`,
      {
        headers: { userId: userId },
      }
    );
    const data = await response.data;

    setFilesData(data);

    if (data && data.length > 0) {
      console.log(data[0]);
    }

    setloading(false);
  };

  // const userId = window.localStorage.getItem("userId");
  // const fetchPostFunc = () => {
  //   console.log("get 시도 확인");
  //   //백으로 데이터 보내기
  //   fetch(
  //     `https://플랜잇.웹.한국:8080/api/starTalk/retrieve?query=${keyword}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         userId: userId,
  //       },
  //       body: JSON.stringify({
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setFilesData(response.data);
  //       if (response.token) {
  //         localStorage.setItem("wtw-token", response.token);
  //       }
  //     });
  // };

  console.log("get 시도! keyword > ", keyword);
  console.log("get 해온 data", filesData);

  return (
    <Container>
      {/* <ArrowIcon to="/" /> */}
      <InputContainer>
      <SearchIcon />
        <Input
          placeholder="#에코 미션 챌린지"
          active={hasKeyword}
          value={keyword}
          onChange={handleKeyword}
          onKeyDown={handleEnter}
        />

        {keyword && <RemoveIcon onClick={handleClearKeyword} />}
      </InputContainer>
      {/* <PencilIcon /> */}
    </Container>
  )
}

export default SearchBar