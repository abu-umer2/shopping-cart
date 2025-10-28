import Header from "./common/Header";
import Footer from "./common/Footer";
import Menu from "./common/Menu";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./data/reducer";
const UserLandingPage = () => {
  return (
    <div className="">
       <Provider store={store}>
              <Header />
       </Provider>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLandingPage;
