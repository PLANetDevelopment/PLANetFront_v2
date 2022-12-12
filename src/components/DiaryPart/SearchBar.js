import React, { useState } from 'react'
import styled, { css } from 'styled-components'
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
  padding: 20px 20px 20px 50px;
  box-sizing: border-box;
`

//Link태그의 스타일
//horizontalCenter 스타일 컴포넌트를 믹스인하여 속성값 전달
const ArrowIcon = styled(Link)`
  ${horizontalCenter}
  left: 18px;
  display: block;
  width: 21px;
  height: 18px;
  background-position: -164px -343px;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`

// const SearchIcon = styled.span`
//   ${horizontalCenter}
//   right: 18px;
//   width: 24px;
//   height: 24px;
//   background-position: -356px -260px;
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
`

const Input = styled.input`
  font-family: 'pretendard';
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  padding: 4% 5%;
  border-radius: 8px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  border: 0;

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

function SearchBar({ onAddKeyword }) {
  // 1. 검색어를 state 로 다루도록 변경
  // 2. 이벤트 연결
  // 3. Link to 설명

  //form을 관련 요소를 다룰때는 2-way 데이터 바인딩을 해줍니다! (input 의 value에 state를 넣는 것)
  const [keyword, setKeyword] = useState('')

  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }
  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword)
      setKeyword('')
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

  return (
    <Container>
      <ArrowIcon to="/" />
      <InputContainer>
        <Input
          placeholder="검색어를 입력해주세요"
          active={hasKeyword}
          value={keyword}
          onChange={handleKeyword}
          onKeyDown={handleEnter}
        />

        {keyword && <RemoveIcon onClick={handleClearKeyword} />}
      </InputContainer>
      {/* <SearchIcon /> */}
    </Container>
  )
}

export default SearchBar