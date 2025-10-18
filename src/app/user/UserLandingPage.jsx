import Header from "./common/Header";
import Footer from "./common/Footer";
import Menu from "./common/Menu";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Outlet } from "react-router-dom";
const UserLandingPage = () => {
  return (
    <div className="">
      <Header />
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLandingPage;
