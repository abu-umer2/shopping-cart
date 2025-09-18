import React, { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import axios from "axios";

export default function Subcat() {
  const [subCat, setSunCat] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const [catigories, setCatigories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCatigories(response.data));
  }, []);

  const onSubmit = async () => {
    console.log("sub", subCat);
    console.log("active", isActive);
    await axios.post("http://localhost:3000/sub-categories", {
      name: subCat,
      categoryId,
      isActive,
    });
  };
  return (
    <div className="d-flex justify-content-center items-center">
      <form
        className="d-flex flex-column m-5 p-5 gap-3"
        style={{ width: "500px" }}
      >
        <div className="d-flex flex-column gap-2 ">
          <label> enter Sub category name</label>
          <Input
            type="text"
            className="form-control"
            id="subCat"
            placeholder="Enter subcategory"
            name="subCat"
            value={subCat}
            onChange={(e) => setSunCat(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column gap-2">
          <label>Choose Category</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Choose Category</option>
            {catigories.map((cat) => {
              return (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="d-flex flex-column aling-items-center justify-content-between gap-3">
          <label className="">Status</label>
          <select
            className="form-select "
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
          className="btn px-5"
          onClick={onSubmit}
        >
          ADD SUB
        </Button>
      </form>
    </div>
  );
}
