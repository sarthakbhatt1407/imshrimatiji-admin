import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Drawer from "./components/Drawer/Drawer";
import { useParams } from "react-router-dom";
import AddProduct from "./components/Products/AddProduct";
import EditProducts from "./components/Products/EditProducts";
import DeletedProducts from "./components/Products/DeletedProducts";

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
  background-color: #f5f5f5;
  h1 {
    margin-left: 2rem;
    text-transform: capitalize;
    margin-bottom: 0rem;
    letter-spacing: 0.09rem;
  }
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

        <ContentDiv>
          {currentPage === "add-new" && <h1>Add new product</h1>}
          {currentPage === "edit-products" && <h1>Edit/Delete</h1>}
          {currentPage === "add-new" && <AddProduct />}
          {currentPage === "edit-products" && <EditProducts />}
          {currentPage === "deleted-products" && <DeletedProducts />}
        </ContentDiv>
      </RightDiv>
    </MainBox>
  );
};

export default Products;
