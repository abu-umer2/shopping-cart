import React, { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import axios from "axios";

export default function Category() {
  const [cat, setCat] = useState("");
  // const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);

  const onSubmit = async () => {
    await axios.post("http://localhost:3000/categories", {
      name: cat,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  

  return (
    <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
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
        <div className="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            Add Category
          </button>
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content justify-content-center text-center ">
              <h4 className="modal-title mt-3">Add Category</h4>

              <div className="modal-body">
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
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  className="btn btn-primary mb-2 "
                  style={{ width: "100px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
