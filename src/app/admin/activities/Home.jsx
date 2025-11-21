import { Outlet } from "react-router-dom";
import Nav from "./product/Nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
