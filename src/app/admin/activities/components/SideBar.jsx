import {
  Barcode,
  ChartBarStacked,
  ListMinus,
  LogOutIcon,
  SendToBack,
  SquareDashedIcon,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={`vh-100  text-white p-1 position-fixed top-0 start-0 d-flex flex-column justify-content-between `}
      style={{
        width: isOpen ? "250px" : "70px",
        transition: "width 0.3s ease",
      }}
    >
      <div className="d-flex flex-column gap-3">
        <button
          onClick={toggle}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <SquareDashedIcon size={50} />
          {isOpen && <h6>Dashboard</h6>}
        </button>
        <button
          onClick={() => {
            navigate("products");
          }}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <Barcode size={50} />
          {isOpen && <h6>Products</h6>}
        </button>
        <button
          onClick={() => {
            navigate("cat");
          }}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <ChartBarStacked size={50} />
          {isOpen && <h6>Categories</h6>}
        </button>
        <button
          onClick={() => {
            navigate("subcat");
          }}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <ListMinus size={50} />
          {isOpen && <h6>Sub Categories</h6>}
        </button>
        <button
          onClick={() => {
            navigate("");
          }}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <Users size={50} />
          {isOpen && <h6>Users</h6>}
        </button>
        <button
          onClick={() => {
            navigate("orders");
          }}
          className="d-flex gap-2 rounded border-0 align-items-center"
        >
          <SendToBack size={50} />
          {isOpen && <h6>Orders</h6>}
        </button>
      </div>
      <button
        onClick={() => {
          navigate("logout");
        }}
        className="d-flex gap-2 rounded border-0 align-items-center mb-1"
      >
        <LogOutIcon size={50} />
        {isOpen && <h6>Logout</h6>}
      </button>
    </div>
  );
};

export default SideBar;
