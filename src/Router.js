import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLanding from "./app/user/UserLandingPage";
import Pagenotfound from "./NotFoundPage";
import Home from "./app/admin/activities/Home";
import Category from "./app/admin/activities/product/Category";
import Subcat from "./app/admin/activities/product/Subcat";
import Product from "./app/admin/activities/product/Product";
import Logout from "./app/admin/Logout";
import AdminLanding from "./app/admin/AdminLandingPage";
import Landing from "./app/user/components/Landing";
import ProductsList from "./Products";
// import Login from "./app/user/components/Login";
import SignUp from "./app/user/components/SignUp";
import ProductDetails from "./app/user/components/ProductDetails";
import Cart from "./app/user/components/Cart";
import Profile from "./app/user/components/Profile";
import UserGuard from "./app/user/components/UserGaurd";
import AdminGuard from "./app/admin/services/AdminGuard";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="" element={<AdminLanding />} /> */}
        <Route path="admin-login" element={<AdminLanding />} />
        <Route path="" element={<AdminGuard />}>
          <Route index element={<Home />} />
          <Route path="cat" element={<Category />} />
          <Route path="subcat" element={<Subcat />} />
          <Route path="product" element={<Product />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="user" element={<UserLanding />}>
          <Route path="" element={<Landing />} />
          <Route path="productsList/:subId" element={<ProductsList />} />
          <Route path="productDetails" element={<ProductDetails />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="siginup" element={<SignUp />} />
          <Route element={<UserGuard />}>
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}
