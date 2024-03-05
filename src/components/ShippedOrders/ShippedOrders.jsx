import React from "react";
import Orders from "../Orders/Orders";
import styled from "styled-components";
const MainBox = styled.div`
  padding: 0 2rem;
`;

const ShippedOrders = (props) => {
  const { orders, page, trackingLinkRemover, showAddModalHandler } = props;

  return (
    <MainBox>
      <Orders
        orders={orders}
        page={page}
        trackingLinkRemover={trackingLinkRemover}
        showAddModalHandler={showAddModalHandler}
      />
    </MainBox>
  );
};

export default ShippedOrders;
