import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import CompLoader from "../components/Loaders/CompLoader";

const OuterBox = styled.div`
  background-color: #f7f7f7;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div`
  background-color: white;
  width: 60vw;
  box-shadow: 0.1rem 0.1rem 2rem rgba(161, 161, 161, 0.28);
  border-radius: 0.8rem;
  overflow: hidden;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (max-width: 700px) {
    /* display: none; */
    grid-template-columns: 1fr;
    width: 90vw;
  }
`;

const LeftDivAni = keyframes`
    0%{  transform: translateX(100%);
        z-index: 100;
        opacity: 0;

    }
    100%{
        transform: translateX(0);
        opacity: 1; z-index: 1;
    }
`;
const RightDivAni = keyframes`
    
    0%{    transform: translateX(-50%);
        z-index: -1;
        opacity: 0;

    }
    30%{
        z-index: -1;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
        z-index: 1;
    }
`;

const RightDiv = styled.div`
  /* margin: 1rem 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  animation: ${RightDivAni} 0.6s;
  padding: 2rem;
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    color: #cacaca;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 400;
  }
  @media only screen and (max-width: 700px) {
    padding: 1rem;
  }
`;

const EmailVerificationBox = styled.div`
  display: flex;
  width: 60%;
  height: fit-content;

  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem;
  span {
    cursor: pointer;
    color: #df8fa1;
  }
  p {
    width: 100%;
    color: rgb(221, 57, 57);
    margin-top: -1.3rem;
    letter-spacing: 0.08rem;
  }
`;
const LoaderBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.6rem;
  z-index: 2;
  background-color: #f9f8f852;
`;

const Input = styled.input`
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
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background-color: #ba445e;
  &:hover {
    filter: brightness(1.03);
  }
`;

const DisabledBtn = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #dbdbdb;

  &:hover {
    filter: brightness(1.03);
  }
`;
const Span = styled.span`
  text-transform: capitalize;
`;

const Login = () => {
  const [emailVer, setEmailVer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const [serverTxt, setServerTxt] = useState("");
  const navigate = useNavigate();
  const [showMobile, setShowMobile] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    const intv = setInterval(() => {
      allFieldChecker();
    }, 500);

    return () => {
      clearInterval(intv);
    };
  }, []);

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const defaultFields = {
    fullName: "",
    email: "",
    password: "",
    contactNum: "",
    otp: "",
  };
  const [inpFields, setInpFields] = useState(defaultFields);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const allFieldChecker = () => {
    setAllValid(false);
    const email = document.querySelector("#email");
    const contactNum = document.querySelector("#contactNum");

    const password = document.querySelector("#password").value;
    if (contactNum) {
      if (contactNum.value.length === 10 && password.length > 5) {
        setAllValid(true);
      }
    } else {
      if (validateEmail(email.value) && password.length > 5) {
        setAllValid(true);
      }
    }
  };
  const onBlurHandler = (e) => {
    const id = e.target.id;
    const val = document.querySelector(`#${e.target.id}`).value;
    if (id === "email") {
      if (!validateEmail(val)) {
        setEmailErr(true);
      }
    }
    if (id === "password") {
      if (val.trim().length < 6) {
        setPasswordErr(true);
      }
    }
  };

  const onChangeHandler = (e) => {
    setServerErr(false);
    const id = e.target.id;
    const val = e.target.value;
    allFieldChecker();

    if (id === "email") {
      setServerErr(false);
      setServerTxt("");
      setEmailErr(false);
    }
    if (id === "contactNum") {
      setMobileErr(false);
    }
    if (id === "password") {
      setPasswordErr(false);
    }

    setInpFields({ ...inpFields, [id]: val });
  };
  const onSubmitHandler = async () => {
    if (!allValid) {
      return;
    }
    setIsLoading(true);
    let res;

    res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/admin-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inpFields.email,
        password: inpFields.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerErr(true);
      setServerTxt(data.message);
      setInpFields({ ...inpFields, password: "" });
    }
    // alert(data.message);
    console.log(data);
    if (data.success) {
      setName(data.user.name);
      setState({ ...state, open: true });

      setTimeout(() => {
        dispatch({ type: "log in", data: { ...data } });
        navigate("/");
      }, 1000);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", top: 0, fontSize: "1.1rem" }}
        >
          Log in successfull. We're thrilled to see you again{" "}
          <Span>{name}</Span>.
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          <RightDiv>
            <h2>Log In</h2>
            <h3>Ready to dive back into your shopping journey?</h3>
            {emailVer && (
              <EmailVerificationBox>
                {isLoading && <CompLoader />}
                <>
                  <Input
                    type="text"
                    className="inputField"
                    name="email"
                    data-aos="zoom-in"
                    id="email"
                    onChange={onChangeHandler}
                    placeholder="Email"
                    onBlur={onBlurHandler}
                    value={inpFields.email}
                    style={{
                      border: `${
                        emailErr
                          ? "1px solid #d72020"
                          : "1px solid rgba(166, 166, 166, 0.3)"
                      }`,
                    }}
                  />
                  {emailErr && <p data-aos="zoom-in">Invalid Email</p>}
                </>
                <Input
                  type="password"
                  name=""
                  className="inputField"
                  id="password"
                  onBlur={onBlurHandler}
                  value={inpFields.password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                  style={{
                    border: `${
                      passwordErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {passwordErr && (
                  <p data-aos="zoom-in">
                    Password is too short (minimun 6 charcters.)
                  </p>
                )}
                {serverErr && <p>{serverTxt}</p>}
                {allValid && (
                  <SubmitButton onClick={onSubmitHandler}>Submit</SubmitButton>
                )}
                {!allValid && <DisabledBtn>Submit</DisabledBtn>}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
    </>
  );
};

export default Login;
