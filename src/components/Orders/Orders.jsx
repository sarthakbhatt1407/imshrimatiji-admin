import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainBox = styled.div`
  border: 1px solid #dfdfdf;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.6rem;
`;

const ProductsTable = styled.table`
  height: fit-content;
  width: 100%;
  text-align: center;
  thead {
    background-color: #f1f2f2;
    tr {
      td {
        padding: 0.4rem 1rem;
        color: #5e5e5e;
        text-transform: capitalize;
        font-size: 0.9rem;
        font-weight: bold;
        &:first-child {
          text-align: center;
        }
        @media only screen and (max-width: 1220px) {
          font-size: 0.8rem;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 0.8rem 1rem;
        font-size: 1rem;
        color: #4f4f4f;
        border-bottom: 1px solid #f2f2f2;
        a {
          color: black;
          text-decoration: none;
        }
      }
    }
  }
`;

const ProductImgTextBox = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  color: #4f4f4f;
  gap: 1rem;
  div {
    font-size: 1rem;
    p {
      font-size: 0.9rem;
    }
  }
  img {
    width: 5rem;
    border-radius: 0.3rem;
    display: inline;
    margin-right: 0.8rem;
  }
  p {
    text-transform: capitalize;
    display: inline;
    font-size: 1.2rem;
    font-weight: bold;
    div {
      span {
        font-size: 0.9rem;
      }
    }
  }
  @media only screen and (max-width: 1220px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    text-align: center;

    p {
      font-size: 1.25rem;
    }
    img {
      width: 7rem;
      margin-right: 0;
    }
  }
`;

const NoItemsFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #f7f5f5; */
  height: 30vh;
  p {
    color: #a6a6a6b7;
    font-size: 1.7rem;
    letter-spacing: 0.2rem;
  }
`;

const Orders = (props) => {
  const { orders, page, showAddModalHandler, trackingLinkRemover } = props;
  const showAddModalHandlerCLick = (e) => {
    showAddModalHandler(e);
  };

  return (
    <MainBox>
      <ProductsTable>
        <thead>
          <tr>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Subtotal</td>
            <td>Shipping</td>
            <td>Order Date/Time</td>
            <td>Address</td>
            <td>Paymnet Id</td>
            {page && <td>Tracking</td>}
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return (
              <tr key={item.productId + Math.random() * 20}>
                <td>
                  <Link
                    to={`${process.env.REACT_APP_DEPLOYED_FRONTEND_URL}/product/${item.category}/${item.slug}/${item.productId}`}
                    state={{ productId: `${item.productId}` }}
                  >
                    <ProductImgTextBox>
                      <img src={item.image} alt="" />
                      <p>
                        <div>
                          <span>{item.orderTitle} </span>
                          <span>({item.color})</span>
                        </div>
                        <div>
                          <p>Size : </p>
                          {item.size}
                        </div>
                      </p>
                    </ProductImgTextBox>
                  </Link>
                </td>
                <td>₹ {Number(item.price).toLocaleString("en-IN")}</td>
                <td>{item.quantity}</td>
                <td>₹ {Number(item.orderPrice).toLocaleString("en-IN")}</td>
                <td>{item.status}</td>
                <td>
                  <div>
                    <span>
                      {item.day} {item.month}, {item.year}
                    </span>
                  </div>
                  <span>
                    {item.time.split(":")[0]}:{item.time.split(":")[1]}
                  </span>
                </td>
                <td
                  style={{
                    fontSize: ".8rem",
                    width: "20%",
                    textWrap: "wrap",
                  }}
                >
                  {item.addressLine1}, {item.addressLine2}, {item.city} -{" "}
                  {item.cityPincode}, {item.addressState}
                </td>
                <td>{item.paymentOrderId.toLowerCase()}</td>
                {page === "pending" && (
                  <td>
                    <button id={item._id} onClick={showAddModalHandlerCLick}>
                      &#43;
                    </button>
                  </td>
                )}
                {page === "shipped" && (
                  <td>
                    <button
                      id={item._id}
                      onClick={(e) => {
                        showAddModalHandler(e, "edit", item.tracking);
                      }}
                    >
                      &#9998;
                    </button>
                    <button
                      id={item._id}
                      onClick={(e) => {
                        console.log(e.target.id);
                        trackingLinkRemover(e.target.id);
                      }}
                    >
                      &#x1F5D1;
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </ProductsTable>
      {orders.length === 0 && (
        <NoItemsFoundBox>
          <p>No orders found!</p>
        </NoItemsFoundBox>
      )}
    </MainBox>
  );
};

export default Orders;
