import React from "react";
import styled from "styled-components";
import Drawer from "../components/Drawer/Drawer";
import Navbar from "../components/Navbar/Navbar";
import Users from "../components/Users/Users";

const MainBox = styled.div`
  display: flex;
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f0f0f0;
  h1 {
    margin-left: 1rem;
  }
`;

const ContentDiv = styled.div`
  height: 92vh;
  overflow: auto;
  padding: 1rem;
`;

const AllUsers = () => {
  return (
    <MainBox>
      <Drawer />
      <RightDiv>
        <Navbar />
        <h1>All Users</h1>
        <ContentDiv>
          <Users />
        </ContentDiv>
      </RightDiv>
    </MainBox>
  );
};

export default AllUsers;
