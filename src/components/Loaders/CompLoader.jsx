import React from "react";
import styled, { keyframes } from "styled-components";

const rot = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  span {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #5e5e5e;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: ${rot} 1s linear infinite;
  }
`;

const CompLoader = () => {
  return (
    <MainBox>
      <span class="loader"></span>
    </MainBox>
  );
};

export default CompLoader;
