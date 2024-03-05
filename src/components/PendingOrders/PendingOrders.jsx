import React, { useState } from "react";
import Orders from "../Orders/Orders";
import styled from "styled-components";
const MainBox = styled.div`
  padding: 1rem 2rem;
  position: relative;
`;

const PendingOrders = (props) => {
  const { orders, page, showAddModalHandler } = props;
  console.log(orders);

  return (
    <MainBox>
      <Orders
        orders={orders}
        page={page}
        showAddModalHandler={showAddModalHandler}
      />
    </MainBox>
  );
};

export default PendingOrders;
