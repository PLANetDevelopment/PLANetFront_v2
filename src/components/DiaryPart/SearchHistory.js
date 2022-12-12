import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 5%;
`
const Title = styled.span`
  font-family: 'pretendard';
  float: left;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`
const RemoveText = styled.span`
  font-family: 'pretendard';
  float: right;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  opacity: 50%;
`

const HistoryContainer = styled.div`
  padding-bottom: 5%;
  text-align: center;
`

const PinText = styled.span`
  font-family: 'pretendard';
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  opacity: 50%;
`

const ListContainer = styled.ul`
  font-family: 'pretendard';
  font-size: 11px;
  width: 90%;
  margin: 0 auto;
  text-align: left;
`

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.button`
  float: right;
  color: #0cde8b;
  border: 1px solid #0cde8b;
  padding: 3px 5px;
  border-radius: 15px;
`

const Keyword = styled.span`
  font-family: 'pretendard';
  font-size: 15px;
  font-weight: 400;
`

function SearchHistory({ keywords, onRemoveKeyword, onClearKeywords }) {
  console.log('keyword', keywords)
  if (keywords.length === 0) {
    return (
      <>
        <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClearKeywords}>모두 삭제</RemoveText>
        </HeaderContainer>
        <HistoryContainer>
            <PinText>최근 검색어가 없어요</PinText>
        </HistoryContainer>
      </>
    )
  }
  return (
    <>
    <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClearKeywords}>모두 삭제</RemoveText>
      </HeaderContainer>
    <HistoryContainer>
      <ListContainer>
        {keywords.map(({ id, text }) => {
          return (
            <KeywordContainer key={id}>
              <Keyword>{text}</Keyword>
              <RemoveButton
                //눌렸을때 해야하는거라 arrow function을 사용하여 실행
                //그냥 함수 쓰면은 그려지자마자 바로 실행됨
                onClick={() => {
                  onRemoveKeyword(id)
                }}
              >
                삭제
              </RemoveButton>
            </KeywordContainer>
          )
        })}
      </ListContainer>
    </HistoryContainer>
    </>
  )
}

export default SearchHistory