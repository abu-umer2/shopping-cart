import axios from "axios";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data));

    axios.get("http://localhost:3000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:3000/sub-categories/subs/${category}`)
        .then((response) => setSubCategories(response.data));
      setSubCategory(""); // reset subcategory
    }
  }, [category]);
  console.log(products);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
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
      await axios.post("http://localhost:3000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setReview("");
      setCategory("");
      setSubCategory("");
      setImageFile(null);
      setImagePreview(null);
      // refresh product list
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>
                {Array.isArray(product.categoriesId)
                  ? product.categoriesId.map((c) => c.name).join(", ")
                  : product.categoriesId?.name || "No Category"}
              </td>

              <td>
                {Array.isArray(product.subCategoriesId)
                  ? product.subCategoriesId.map((c) => c.name).join(", ")
                  : product.subCategoriesId?.name || "No Subcategory"}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add Category
        </button>
      </div>
      <div className="modal p-0 m-0" id="myModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content justify-content-center text-center ">
            <h4 className="modal-title my-4">Add Product</h4>

            <div className="modal-body m-1 p-0">
              <form
                className="d-flex flex-column gap-3 align-items-center justify-content-center"
                onSubmit={onSubmit}
              >
                <div
                  className="d-flex justify-content-between "
                  style={{ gap: "200px" }}
                >
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-4">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <label>Review</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter product review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex  gap-5 align-items-start">
                      <label>Category</label>
                      <select
                        className="form-select"
                        style={{ width: "300px" }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Choose Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex  gap-4 align-items-start">
                      <label>SubCategory</label>
                      <select
                        className="form-select"
                        style={{ width: "300px" }}
                        aria-label="Default select example"
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option value="">Choose SubCategory</option>
                        {subCategories.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="d-flex   align-items-start"
                      style={{ gap: "76px" }}
                    >
                      <label>Image</label>
                      <input type="file" onChange={handleImageChange} />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          width="100"
                          className="mt-2 border"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex flex-column align-items-center justify-content-between gap-3"
                  style={{ width: "80%" }}
                >
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-3 mt-3">
                  <button type="submit" className="btn btn-primary">
                    ADD
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
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
}
