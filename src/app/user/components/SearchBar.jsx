import { useEffect, useState } from "react";
import ProductServices from "../../services/productServices";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResult([]);
      return;
    }

    const fetchAll = async () => {
      try {
        const [cats, subs, products] = await Promise.all([
          ProductServices.searchCat(debouncedQuery),
          ProductServices.searchSub(debouncedQuery),
          ProductServices.searchProduct(debouncedQuery),
        ]);

        setResult([...cats.data, ...subs.data, ...products.data]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAll();
  }, [debouncedQuery]);

  console.log("result", result);

  const navigateToItem = (item) => {
    if (item.subCategories) {
      navigate("");
    }
  };

  return (
    <form
      className=" d-flex flex-column"
      style={{ position: "relative", width: "500px" }}
    >
      <div className="d-flex  rounded bg-light align-items-center ">
        <input
          className="form-control me-2 border-0 bg-light"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        />
        <i
          className="fa fa-search fa-lg p-2 bg-light rounded-end-2"
          style={{ color: "gray" }}
        ></i>

        {/* <button className="btn btn-white bg-light" type="button"></button> */}
      </div>
      <div
        className=" bg-white rounded-bottom  "
        style={{
          position: "absolute",
          top: "33px",
          zIndex: 1,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {result.map((item) => (
          <ul key={item._id} style={{ padding: 0, margin: 0 }}>
            <li
              style={{ listStyle: "none" }}
              className="d-flex align-items-center ps-2  my-2 gap-2 "
              role="button"
              onClick={navigateToItem(item)}
            >
              {item.image ? (
                <img
                  src={`http://localhost:1000/uploads/products/${item.image}`}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                ""
              )}
              {item.name}
            </li>
          </ul>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
