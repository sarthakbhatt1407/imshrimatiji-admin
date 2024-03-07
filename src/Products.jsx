import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Drawer from "./components/Drawer/Drawer";
import { useParams } from "react-router-dom";
import AddProduct from "./components/Products/AddProduct";

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

const Products = () => {
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
    return () => {};
  }, [page]);

  return (
    <MainBox>
      <Drawer />
      <RightDiv>
        <Navbar />

        <ContentDiv>{page === "add-new" && <AddProduct />}</ContentDiv>
      </RightDiv>
    </MainBox>
  );
};

export default Products;
