import {
  AccessTime,
  Close,
  Home,
  Inventory2Outlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const MainBox = styled.div`
  height: 100vh;
  color: #d9d6d6;
  background-color: #303c54;
  position: relative;
  width: 4rem;
  overflow: hidden;
  transition: all 0.5s;

  a {
    color: #d9d6d6;
    text-decoration: none;
  }
  button {
    position: absolute;
    top: 0.5rem;
    right: ${(props) => (props.show ? "5%" : "25%")};
    border: none;
    outline: none;
    background-color: transparent;
    color: #d9d6d6;
    div {
      width: 25px;
      height: 2px;
      background-color: #d9d6d6;
      margin: 4px 0;
    }
  }
`;

const AllLinksBox = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.show ? "1.5rem" : "2.7rem")};
  padding: 4rem 0;
  padding-left: 1rem;
  display: flex;
  justify-content: center;
  svg {
    transform: scale(1.2);
    transition: all 1s;
  }
`;
const LinkBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: #d9d6d6;
  }
`;

const Drawer = () => {
  const [show, setShow] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onClickHandler = () => {
    const ele = document.querySelector("#drawer");
    console.log(ele);
    if (!show) {
      ele.style.width = "15rem";
      setShow(true);
    } else {
      ele.style.width = "4rem";
      setShow(false);
    }
  };
  return (
    <MainBox id="drawer">
      {!show && (
        <button show={show} onClick={onClickHandler}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      )}
      {show && (
        <button show={show} onClick={onClickHandler}>
          <Close />
        </button>
      )}
      <AllLinksBox show={show}>
        <LinkBox>
          {!show && (
            <Link to={"/admin/home"}>
              <Home />
            </Link>
          )}
          {show && (
            <Link to={"/admin/home"} onClick={onClickHandler}>
              Home
            </Link>
          )}
        </LinkBox>
        <LinkBox>
          {!show && (
            <Link to={"/admin/orders/pending"}>
              <LocalShippingOutlined />
            </Link>
          )}
          {show && (
            <>
              <Accordion
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "-1rem",
                  color: "#d9d6d6",
                  marginBottom: "-1rem",
                  width: "100%",
                }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  style={{ color: "#d9d6d6" }}
                >
                  <Typography sx={{ flexShrink: 0 }}>Orders</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Link to={`/admin/orders/pending`} onClick={onClickHandler}>
                    <Typography
                      style={{
                        margin: "1rem 0",
                        marginTop: "-0.7rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <AccessTime style={{ transform: "scale(.8)" }} /> Pending
                      Orders
                    </Typography>
                  </Link>
                  <Link to={`/admin/orders/shipped`} onClick={onClickHandler}>
                    <Typography
                      style={{
                        margin: "1rem 0",
                        marginTop: "-0.7rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <LocalShippingOutlined
                        style={{ transform: "scale(.8)" }}
                      />{" "}
                      Shipped Orders
                    </Typography>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </LinkBox>
        <LinkBox>
          {!show && (
            <Link to={"/admin/products/add-new"}>
              <Inventory2Outlined />
            </Link>
          )}
          {show && (
            <>
              <Accordion
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "-1rem",
                  color: "#d9d6d6",
                  marginBottom: "-1rem",
                  width: "100%",
                }}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  style={{ color: "#d9d6d6" }}
                >
                  <Typography sx={{ flexShrink: 0 }}>Products</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Link to={"/admin/products/add-new"} onClick={onClickHandler}>
                    <Typography
                      style={{
                        margin: "1rem 0",
                        marginTop: "-0.7rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".rem",
                      }}
                    >
                      Add New Product
                    </Typography>
                  </Link>

                  <Link
                    to={"/admin/products/edit-products"}
                    onClick={onClickHandler}
                  >
                    <Typography
                      style={{
                        margin: "1rem 0",
                        marginTop: "-0.7rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      Edit / Delete
                    </Typography>
                  </Link>

                  <Link
                    to={"/admin/products/deleted-products"}
                    onClick={onClickHandler}
                  >
                    <Typography
                      style={{
                        margin: "1rem 0",
                        marginTop: "-0.7rem",
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      Deleted
                    </Typography>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </LinkBox>
      </AllLinksBox>
    </MainBox>
  );
};

export default Drawer;
