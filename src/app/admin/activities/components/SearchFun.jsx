import React, { useEffect, useState } from "react";

const SearchFun = ({ items, onFilter }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("query", query.trim());
    const filtered =
      query.trim() === ""
        ? items
        : items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          );

    onFilter(filtered);
    console.log("filtered", filtered);
  }, [items, onFilter, query]);

  return (
    <form
      style={{ width: "500px" }}
      className="border border-black rounded-1 mt-2"
    >
      <div className="d-flex  rounded bg-light align-items-center ">
        <input
          className="form-control me-2 border-0 bg-light"
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        />
        <i
          className="fa fa-search fa-lg p-2 bg-light rounded-end-2"
          style={{ color: "gray" }}
        ></i>
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
      ></div>
    </form>
  );
};
export default SearchFun;
