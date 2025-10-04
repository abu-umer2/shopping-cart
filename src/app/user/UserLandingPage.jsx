import React from "react";
import Header from "./common/Header";
import Banner from "./common/Banner";
import Footer from "./common/Footer";
import Menu from "./common/Menu";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Outlet } from "react-router-dom";
const UserLandingPage = () => {
  return <div>
    <Header />
    <Menu />
    <Outlet />
    <Footer />
  </div>;
};

export default UserLandingPage;
