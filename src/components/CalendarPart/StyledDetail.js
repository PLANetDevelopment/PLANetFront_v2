import React from "react";
import styled from "styled-components";

const StyledDetail = styled.div`
  /* .detail-list {
    margin-bottom: 70px;
  } */
  .selected-detail {
    color: white;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    font-weight: 600;
    margin: 5% 10%;
  }
  .selected-date {
    font-size: 19px;
  }
  .selected-total {
    font-size: 16px;
    margin-left: auto;
  }
  .item-list {
    bottom: 70px;
  }

  .detail-box {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 13px;
    margin-bottom: 10px;
    padding: 20px;
  }

  .detail-box .eco {
    color: rgba(var(--green));
  }
  .detail-box .neco {
    color: rgba(var(--mid-gray));
  }

  .detail-box:active {
    opacity: 0.5;
  }
  .type-name {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  .type-cost {
    font-size: 16px;
    font-weight: normal;
    color: white;
  }
  .type {
    margin-bottom: 15px;
  }

  .details {
    font-size: 14px;
    margin-top: 20px;
  }
  .details-circle {
    margin-top: 1.5px;
    font-size: 10px;
    color: transparent;
  }
  .details-circle.none {
    color: transparent;
  }
  .details-detail-container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .details-memo {
    font-size: 14px;
    color: #b4b6b8;
  }
  .details-detail {
    margin-top: 8px;
    font-size: 11px;
  }

  .type,
  .details {
    display: flex;
    flex-direction: row;
  }

  .type-cost,
  .details-cost {
    margin-left: auto;
  }
  .details-circle.etc {
    color: white;
  }

  .details-cost.etc {
    color: white;
  }
  .details-cost.eco {
    color: rgb(var(--green));
  }
  .details-cost.neco {
    color: rgb(var(--gray));
  }
  .detail-link {
    text-decoration: none;
  }
`;

export function StyledDetailBlock({ children }) {
  return <StyledDetail>{children}</StyledDetail>;
}

const StyledDetailPage = styled.div`
  background-color: rgb(var(--navy));
  width: 100vw;
  height: 100vh;
  .detail-page {
    padding-bottom: 70px;
    background-color: rgb(var(--navy));
  }
  .detail-info-block {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    color: white;
    margin-bottom: 60px;
  }

  .selected-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin: 30px 0;
  }
  .forward-arrow {
    color: white;
    transform: rotate(180deg);
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .detail-info {
    display: flex;
    flex-direction: row;
    line-height: 16px;
    margin-bottom: 20px;
  }

  .detail-type {
    font-weight: 500;
    font-size: 18px;
  }
  .detail-cost {
    top: 15px;
    position: relative;
  }

  .detail-cost:after {
    position: absolute;
    content: "";
    width: 100vw;
    height: 0;
    left: -5%;
    border-bottom: 12px solid #000b21;
    opacity: 0.7;
  }

  .detail-info .detail-cost-label {
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: #ffffff;
    opacity: 0.5;
    margin-left: 1%;
  }

  .detail-info .detail-cost-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: white;
    margin-left: auto;
  }
  .detail-info .detail-cost-value.none {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(var(--mid-gray));
    opacity: 0.5;
  }

  .detail-div-list {
    color: white;
    width: 100%;
  }
  .detail-history {
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
    margin-left: 5%;
    margin-bottom: 20px;
  }

  .details {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 13px;
    margin-bottom: 13px;
  }
  .details-circle {
    margin-top: 3px;
    font-size: 8px;
  }
  .details-circle.none {
    color: transparent;
  }

  .details-circle.eco {
    color: rgb(var(--green));
  }

  .details-circle.neco {
    color: rgb(var(--mid-gray));
  }

  .details-detail-container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .details-memo {
    font-size: 15px;
    line-height: 16px;
    font-weight: 500;
  }
  .details-detail {
    font-size: 11px;
    line-height: 13px;
    margin-top: 7px;
    font-weight: 400;
  }
  .details-detail.eco {
    color: rgb(var(--green));
  }
  .details-detail.neco {
    color: rgb(var(--mid-gray));
  }
  .details-cost.eco {
    color: rgb(var(--green));
  }
  .details-cost.neco {
    color: rgb(var(--mid-gray));
  }
  .details-cost {
    font-size: 15px;
    font-weight: 400;
    margin-left: auto;
  }
`;

export function StyledDetailPageBlock({ children }) {
  return <StyledDetailPage>{children}</StyledDetailPage>;
}
