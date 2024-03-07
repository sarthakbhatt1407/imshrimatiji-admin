import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Drawer from "../components/Drawer/Drawer";
import PendingOrders from "../components/PendingOrders/PendingOrders";
import ShippedOrders from "../components/ShippedOrders/ShippedOrders";
import { Alert, Snackbar } from "@mui/material";
import CompLoader from "../components/Loaders/CompLoader";
import confirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
const MainBox = styled.div`
  display: flex;
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  /* background-color: #f0f0f0; */
`;
const ContentDiv = styled.div`
  height: 92vh;
  overflow: auto;
  padding: 0 1rem;
  background-color: #f5f5f5;
  h1 {
    text-transform: capitalize;
  }
`;
const AddModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0000003d;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddModalInnerDiv = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: white;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 4rem;
  padding-top: 1rem;
  p {
    text-align: center;
    font-size: 1.3rem;
    text-transform: capitalize;
    letter-spacing: 0.05rem;
    margin-bottom: -0.4rem;
  }
  input {
    width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(166, 166, 166, 0.3);
    border-radius: 5px;
    padding: 0px 10px;
    transition: all 200ms ease-in-out;
    margin-bottom: 5px;

    &::placeholder {
      color: rgba(200, 200, 200, 1);
    }

    &:focus {
      outline: none;
      border-bottom: 1px solid #0086f4;
    }
  }
  span {
    display: flex;
    justify-content: space-evenly;
    button {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      text-transform: uppercase;
      cursor: pointer;
      &:first-child {
        background-color: #009ff4;
        color: white;
      }
    }
  }
`;
const NoOrders = styled.div`
  width: 100%;
  height: 50svh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
  letter-spacing: 0.09rem;
  text-transform: capitalize;
`;

const UserOrderBox = styled.div`
  background-color: white;
  border-radius: 0.4rem;
  margin: 1rem 0;
  padding: 2rem 0;
`;

const UserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  justify-content: space-around;
  width: 60%;
  max-width: 100%;
  p {
    text-transform: capitalize;
  }
  i {
    font-style: normal;
    color: #c6c6c6;
    font-size: 1.1rem;
  }
`;

const OrdersPage = () => {
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [refersher, setRefresher] = useState(0);
  const [pendingOrd, setPendingOrd] = useState(true);
  const [shippedOrd, setShippedOrd] = useState(true);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    text: "",
  });
  const { vertical, horizontal, open, text } = state;
  const ordersFetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/order-by-user`
    );
    const data = await res.json();
    if (res.ok) {
      setOrders(data);
      data.map((ord) => {
        if (ord.pendingOrders.length > 0) {
          setPendingOrd(false);
        }
        if (ord.shippedOrders.length > 0) {
          setShippedOrd(false);
        }
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setPendingOrd(true);
    setShippedOrd(true);
    setCurrentPage(page);
    ordersFetcher();
    return () => {};
  }, [page, refersher]);

  const showAddModalHandler = (e, action, link) => {
    setTrackingLink("");
    setOrderId("");
    setShowAddModal(!showAddModal);
    setOrderId(e.target.id);
    console.log(e.target.id);
    if (action === "edit") {
      setTrackingLink(link);
    }
  };

  const onChangeHandler = (e) => {
    const ele = document.querySelector(`#${e.target.id}`);
    ele.style.border = "none";
    const val = e.target.value;
    setTrackingLink(val);
  };
  const onBlurHandler = (e) => {
    if (e.target.value.trim().length < 1) {
      const ele = document.querySelector(`#${e.target.id}`);
      ele.style.border = "1px solid red";
      ele.placeholder = "Invalid details";
    }
  };

  const trackingLinkAdder = async () => {
    const ele = document.querySelector(`#inp`);
    if (ele.value.trim().length < 1) {
      ele.style.border = "1px solid red";
      ele.placeholder = "Invalid Details";
      return;
    }
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/tracking-updater`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          tracking: trackingLink,
          action: "add",
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setRefresher(refersher + 1);
      setShowAddModal(!showAddModal);
      setState({ ...state, open: true, text: "Tracking details added." });
    }
    setIsLoading(false);
  };
  function handleClickBasic(id) {
    confirm({
      title: "Do you want to remove tracking link ?",
      language: "en",
      content: <h2> </h2>,
      onOk: async () => {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/tracking-updater`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: id,
              action: "remove",
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setRefresher(refersher + 1);
          setState({ ...state, open: true, text: "Tracking details removed." });
        }
        setIsLoading(false);
      },
    });
  }

  const trackingLinkRemover = async (id) => {
    handleClickBasic(id);
  };

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <MainBox>
      <Drawer />
      <RightDiv>
        <Navbar />

        {isLoading && <CompLoader />}
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%", top: 0, fontSize: ".9rem" }}
          >
            {text}
          </Alert>
        </Snackbar>
        <ContentDiv>
          <h1>{page} Orders</h1>{" "}
          {showAddModal && (
            <AddModal>
              <AddModalInnerDiv data-aos="zoom-in">
                <p>Add tracking link</p>
                <input
                  type="text"
                  onChange={onChangeHandler}
                  value={trackingLink}
                  onBlur={onBlurHandler}
                  id="inp"
                />
                <span>
                  <button onClick={trackingLinkAdder}>Add</button>
                  <button id="" onClick={showAddModalHandler}>
                    Cancel
                  </button>
                </span>
              </AddModalInnerDiv>
            </AddModal>
          )}
          {currentPage === "pending" && orders && (
            <>
              {orders.map((obj) => {
                if (obj.pendingOrders.length > 0) {
                  return (
                    <UserOrderBox>
                      <UserInfoDiv>
                        <p>
                          <i>Name : </i> {obj.userName}
                        </p>
                        <span>
                          <i>Email : </i>
                          {obj.userEmail}
                        </span>
                        <span>
                          <i>User id : </i>
                          {obj.userId}
                        </span>
                      </UserInfoDiv>
                      <PendingOrders
                        orders={obj.pendingOrders}
                        page={currentPage}
                        showAddModalHandler={showAddModalHandler}
                      />
                    </UserOrderBox>
                  );
                }
                return <></>;
              })}
              {pendingOrd && <NoOrders>No pending orders.</NoOrders>}
            </>
          )}
          {currentPage === "shipped" && orders && (
            <>
              {orders.map((obj) => {
                if (obj.shippedOrders.length > 0) {
                  return (
                    <UserOrderBox>
                      <UserInfoDiv>
                        <p>
                          <i>Name : </i> {obj.userName}
                        </p>
                        <span>
                          <i>Email : </i>
                          {obj.userEmail}
                        </span>
                        <span>
                          <i>User id : </i>
                          {obj.userId}
                        </span>
                      </UserInfoDiv>
                      <ShippedOrders
                        orders={obj.shippedOrders}
                        page={currentPage}
                        showAddModalHandler={showAddModalHandler}
                        trackingLinkRemover={trackingLinkRemover}
                      />
                    </UserOrderBox>
                  );
                }
                return <></>;
              })}
              {shippedOrd && <NoOrders>No shipped orders.</NoOrders>}
            </>
            // <ShippedOrders orders={shippedOrders} />
          )}
        </ContentDiv>
      </RightDiv>
    </MainBox>
  );
};

export default OrdersPage;
