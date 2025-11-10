import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { openLoginModel } from "../data/authSlice";

const UserGuard = () => {
  const token = sessionStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();

  if (!token) {
    dispatch(openLoginModel(location.pathname));
    return null;
  }

  return <Outlet />;
};

export default UserGuard;
