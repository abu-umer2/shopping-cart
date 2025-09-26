import { useEffect, useState } from "react";
import Button from "../../../shared/controls/Button";
import Input from "../../../shared/controls/Input";
import api from "../../services/auth";
import ProductsTable from "./ProductsTable";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [review, setReview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get("/products").then((response) => setProducts(response.data));
    api.get("/categories").then((response) => setCategories(response.data));
  }, []);
  console.log("cat", category);
  useEffect(() => {
    if (!category) return;
    api
      .get(`/sub-categories/subs/${category}`)
      .then((response) => setSubCategories(response.data));
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    setError(false);
    if (price === "") {
      setError(true);
    }
    if (name === "") {
      setError(true);
    }

    e.preventDefault();
    if (!error) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("review", review);
      formData.append("categoriesId", category);
      if (subCategory) {
        formData.append("subCategoriesId", subCategory);
      }
      if (imageFile) formData.append("image", imageFile);

      try {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully!");
        setName("");
        setDescription("");
        //    setPrice("");
        setReview("");
        setCategory("");
        setSubCategory("");
        setImageFile(null);
        setImagePreview(null);
        // refresh product list
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        alert("Error adding product");
      }
    }
  };

  return (
    <div>
      <ProductsTable products={products} />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Add Product
      </button>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered modal-lg  ">
          <div className="modal-content">
            <div className="modal-body ">
              {/* from */}
              <form className="overflow-hidden" onSubmit={onSubmit}>
                <div className="row">
                  {/* Left side */}
                  <div className="col-12 col-md-6 d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <label>Name:</label>
                      <Input
                        className="form-control flex-grow-1"
                        type="text"
                        placeholder="Enter Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="error-message">
                      {error && name === "" ? "Enter Product" : ""}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <label>Category:</label>
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div className="error-message">
                        {error && category === "" ? "choose Category" : ""}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <label>Review:</label>
                      <select
                        className="form-select"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      >
                        <option>Select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    <div className="error-message">
                      {error && review === "" ? "Enter review" : ""}
                    </div>
                  </div>
                  {/* Right side */}
                  <div className="col-12 col-md-6 d-flex flex-column gap-3 ">
                    <div className="d-flex align-items-center gap-3">
                      <label>Price:</label>
                      <Input
                        className="form-control flex-grow-1"
                        type="text"
                        placeholder="Enter Product Name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="error-message">
                      {error && price === "" ? "Enter price" : ""}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <label>Sub-Category:</label>
                      <select
                        className="form-select"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option>Select sub-Category</option>
                        {subCategories.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                      <div className="error-message">
                        {error && subCategory === ""
                          ? "Choose Sub-category"
                          : ""}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <label>Image:</label>
                      <input type="file" onChange={handleImageChange} />
                      {imagePreview && (
                        <div>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="error-message">
                    {error && imageFile === "" ? "Upload image" : ""}
                  </div>
                </div>
                <div className="mt-2">
                  <label>Description:</label>
                  <textarea
                    name="discription"
                    className=" "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="error-message">
                  {error && description === "" ? "Enter Desctiption" : ""}
                </div>

                {/* control buttons */}

                <div className="d-flex justify-content-center align-items-center gap-4 p-1">
                  <Button size="larg" type="submit">
                    Add Product
                  </Button>

                  <button
                    type="button"
                    className="btn btn-danger px-5"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
