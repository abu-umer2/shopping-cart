import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = isOpen ? 250 : 70;

  return (
    <div className="d-flex">
      <div
        className=""
        style={{
          width: `${sidebarWidth}px`,
          transition: "width 0.3s ease",
        }}
      >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <Nav sidebarWidth={sidebarWidth} />
        <div className="flex-grow-1 overflow-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
