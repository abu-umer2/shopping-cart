import React, { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import axios from "axios";

export default function Category() {
  const [cat, setCat] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);

  const onSubmit = async () => {
    await axios.post("http://localhost:3000/categories", {
      name: cat,
      isActive,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
      <form className="d-flex flex-column gap-3 align-items-center justify-content-center">
        <div className=" d-flex aling-items-center justify-content-between gap-3">
          <label> Name</label>
          <Input
            type="text"
            className="form-control"
            id="cat"
            placeholder="Enter category name (Alphabets)"
            name="cat"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
        </div>
        <div className="d-flex aling-items-center justify-content-between gap-3">
          <label className="">Status</label>
          <select
            className="form-select "
            style={{ width: "205px" }}
            aria-label="Default select example"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="">select status</option>;
            <option value="true">true</option>;
            <option value="false">false</option>;
          </select>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="btn px-5 mt-2"
          onClick={onSubmit}
        >
          ADD
        </Button>
      </form>

      <div className="container rounded mt-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Sub-Categories</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr>
                <td>{cat._id}</td>
                <td>{cat.name}</td>
                <td>
                  {cat.subCategories.length > 0 ? (
                    <ul>
                      {cat.subCategories.map((sub) => (
                        <li key={sub._id}>{sub.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>no categories found</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
