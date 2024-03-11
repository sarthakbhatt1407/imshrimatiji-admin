import { AccountCircleOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const MainBox = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.4rem;
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
        text-transform: capitalize;
        a {
          color: black;
          text-decoration: none;
        }
      }
    }
  }
`;
const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetcher = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/all-users`);
    const data = await res.json();
    console.log(data);
    setAllUsers(data);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, []);

  return (
    <MainBox>
      <ProductsTable>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Contact Number</td>
            <td>User Since</td>
            <td>User Id</td>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 &&
            allUsers.map((item) => {
              return (
                <tr key={item.productId + Math.random() * 20}>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <AccountCircleOutlined /> {item.name}
                  </td>
                  <td style={{ textTransform: "none" }}>{item.email}</td>
                  <td>{item.contactNum}</td>
                  <td>{item.userSince}</td>
                  <td>{item.id}</td>
                </tr>
              );
            })}
        </tbody>
      </ProductsTable>
    </MainBox>
  );
};

export default Users;
