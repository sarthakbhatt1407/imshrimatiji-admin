import React from "react";
import styled from "styled-components";
import Drawer from "../components/Drawer/Drawer";
import Navbar from "../components/Navbar/Navbar";
import Sales from "../components/Sales/Sales";

const MainBox = styled.div`
  display: flex;
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #f0f0f0; */
`;

const ContentDiv = styled.div`
  height: 92vh;
  overflow: auto;
`;

const Home = () => {
  return (
    <MainBox>
      <Drawer />
      <RightDiv>
        <Navbar />

        <ContentDiv>
          <Sales />
        </ContentDiv>
      </RightDiv>
    </MainBox>
  );
};

export default Home;
