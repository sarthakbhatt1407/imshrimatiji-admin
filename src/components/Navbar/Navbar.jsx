import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assests/images/logo.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Badge } from "@mui/material";
import {
  AccessTime,
  Inventory2Outlined,
  MailOutline,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MainBox = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 1rem #e1e1e1;
  height: 8vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImgDiv = styled.div`
  margin-left: 1rem;
  img {
    width: 6rem;
  }
`;

const ProfileDiv = styled.div`
  margin-right: 2rem;
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [pendingOrd, setPendingOrd] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderFethcer = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/order-counter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await res.json();
    if (res.ok) {
      const arr = data.totalOrders.filter((ord) => {
        return ord.status === "pending";
      });
      setPendingOrd(arr);
    }
  };

  useEffect(() => {
    orderFethcer();
    const intv = setInterval(() => {
      orderFethcer();
    }, 1000);
    return () => {
      clearInterval(intv);
    };
  }, []);

  return (
    <MainBox>
      <ImgDiv>
        <img src={logo} alt="" />
      </ImgDiv>

      <ProfileDiv>
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography sx={{ minWidth: 45 }}>
              <Badge badgeContent={4} color="primary" max={999}>
                <MailOutline style={{ color: "#1976D2", cursor: "pointer" }} />
              </Badge>
            </Typography>
            <Link to={"/admin/orders/pending"}>
              <Typography sx={{ minWidth: 50 }}>
                <Badge
                  badgeContent={pendingOrd ? pendingOrd.length : 0}
                  color="success"
                  max={999}
                >
                  <AccessTime
                    style={{ color: "#1976D2", cursor: "pointer" }}
                    color="action"
                  />
                </Badge>
              </Typography>
            </Link>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  //   style={{ backgroundColor: "#0b98f0" }}
                  sx={{ width: 32, height: 32 }}
                >
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={() => {
                dispatch({ type: "logout" });
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </ProfileDiv>
    </MainBox>
  );
};

export default Navbar;
