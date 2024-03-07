import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OrdersPage from "./pages/OrdersPage";
import AOS from "aos";
import "aos/dist/aos.css";
import Products from "./Products";
const App = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
    const aosRefresh = setInterval(() => {
      AOS.refresh();
    }, 500);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/admin/home" element={<Home />} exact />
        <Route path="/admin/orders/:page" element={<OrdersPage />} exact />
        <Route path="/admin/products/:page" element={<Products />} exact />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
