import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OrdersPage from "./pages/OrdersPage";
import AOS from "aos";
import "aos/dist/aos.css";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
    AOS.init({
      once: true,
    });
    const aosRefresh = setInterval(() => {
      AOS.refresh();
    }, 500);
    return () => {
      clearInterval(aosRefresh);
    };
  }, []);

  return (
    <>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/admin/home" element={<Home />} exact />
            <Route path="/admin/orders/:page" element={<OrdersPage />} exact />
            <Route path="/admin/all-users" element={<AllUsers />} exact />
            <Route
              path="/admin/products/:page"
              element={<Products />}
              exact
            />{" "}
            <Route path="*" element={<Home />} />}
          </>
        )}
        {!isLoggedIn && <Route path="*" element={<Login />} />}
      </Routes>
    </>
  );
};

export default App;
