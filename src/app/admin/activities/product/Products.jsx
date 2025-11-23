import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/controls/Button";
import Input from "../../../shared/controls/Input";
import ProductsTable from "./ProductsTable";
import Modal from "bootstrap/js/dist/modal";
import AuthServices from "../../services/auth";
import SearchFun from "../components/SearchFun";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [edit, setEdit] = useState(false);
  // const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const categoryWatch = watch("categoriesId");

  const fetchProducts = async () => {
    try {
      const res = await AuthServices.fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AuthServices.fetchCategories();
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryWatch) return;

    const fetchSubCategories = async () => {
      try {
        const res = await AuthServices.fetchSubCategories(categoryWatch);
        setSubCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubCategories();
  }, [categoryWatch]);

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(imagePreviews);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (img) => {
    setCurrentImages((prev) => prev.filter((i) => i !== img));
  };
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image" && key !== "imageFiles") {
          formData.append(key, data[key]);
        }
      });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (edit && selectedProduct.image) {
        formData.append("image", selectedProduct.image);
      }

      newImages.forEach((file) => {
        formData.append("imageFiles", file);
      });

      if (edit && selectedProduct?.imageFiles) {
        const removedImages = selectedProduct.imageFiles.filter(
          (img) => !currentImages.includes(img)
        );

        if (removedImages.length > 0) {
          formData.append("removeImages", JSON.stringify(removedImages));
        }
      }

      if (!edit) {
        await AuthServices.createProduct(formData);
        alert("Product created successfully!");
      }

      if (edit) {
        await AuthServices.updateProduct(selectedProduct._id, formData);
        alert("Product updated successfully!");
      }

      closeModal();
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const loadUpdates = (pro) => {
    setEdit(true);
    setSelectedProduct(pro);

    reset({
      ...pro,
      categoriesId: pro?.categoriesId?._id || "",
    });

    setTimeout(() => {
      setValue("subCategoriesId", pro?.subCategoriesId?._id || "");
    }, 200);
    setImagePreview(pro.image);
    setCurrentImages(pro.imageFiles || []);
    setNewImages([]);

    displayModal();
  };

  const displayModal = () => {
    const myModal = new Modal(document.getElementById("myModal"));
    myModal.show();
  };

  const closeModal = () => {
    const modalEl = document.getElementById("myModal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  };

  const resetForm = () => {
    reset();
    setImagePreview(null);
    setCurrentImages([]);
    setNewImages([]);
    setEdit(false);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <SearchFun items={products} onFilter={setFilteredProducts} />

      <ProductsTable
        products={filteredProducts}
        updateMethod={loadUpdates}
        setEdit={setEdit}
      />
      <Button
        type="button"
        size="small"
        onClick={() => {
          resetForm();
          displayModal();
        }}
      >
        Add Product
      </Button>
      <div className="modal" id="myModal" data-bs-backdrop="static">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-6">
                    <label>Name</label>
                    <Input
                      {...register("name", { required: "Name required" })}
                      className="form-control"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}

                    <label>Category</label>
                    <select
                      {...register("categoriesId", {
                        required: "Category required",
                      })}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    <label>Size</label>
                    <Input
                      {...register("size", { required: "Size required" })}
                      className="form-control"
                    />

                    <label>Product Type</label>
                    <select
                      {...register("productType")}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="available">Available</option>
                      <option value="best_selling">Best Selling</option>
                      <option value="upcoming">Upcoming</option>
                    </select>

                    <label>Description</label>
                    <textarea
                      {...register("description", {
                        required: "Description required",
                      })}
                      className="form-control"
                    />
                    <div className="mb-3">
                      <label for="formFileSm" className="form-label">
                        Main Image
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        onChange={handleMainImage}
                      />
                    </div>

                    {imagePreview && (
                      <img
                        src={
                          edit && !imagePreview.startsWith("blob")
                            ? `http://localhost:1000/uploads/products/${imagePreview}`
                            : imagePreview
                        }
                        width="70px"
                        height="70px"
                        className="border border-2 border-black rounded-2"
                      />
                    )}
                  </div>

                  <div className="col-6">
                    <label>Price</label>
                    <Input
                      {...register("price", { required: true })}
                      className="form-control"
                    />

                    <label>Sub Category</label>
                    <select
                      {...register("subCategoriesId")}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      {subCategories.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>

                    <label>Color</label>
                    <Input {...register("color")} className="form-control" />

                    <label>Stock</label>
                    <Input
                      {...register("stock", { required: true })}
                      className="form-control"
                    />

                    <label for="formFileSm" className="form-label">
                      Images
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="formFileSm"
                      multiple
                      onChange={handleImagesChange}
                    />

                    {currentImages.map((img, idx) => (
                      <div
                        className="position-relative d-inline-block m-2"
                        key={idx}
                      >
                        <img
                          src={`http://localhost:1000/uploads/products/${img}`}
                          width="70px"
                          height="70px"
                          className="border border-2 border-black rounded-2"
                        />
                        <button
                          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger border-0"
                          type="button"
                          onClick={() => removeExistingImage(img)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {previewImages.map((img, idx) => (
                      <div
                        className="position-relative d-inline-block m-2"
                        key={idx}
                      >
                        <img
                          src={img}
                          width="70px"
                          height="70px"
                          className="border border-2 border-black rounded-2"
                        />
                        <button
                          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger border-0"
                          type="button"
                          onClick={() => removeNewImage(idx)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-3">
                  <Button className="border-0 " size="small" type="submit">
                    {edit ? "Update" : "Create"}
                  </Button>
                  <Button
                    className="border-0 "
                    type="button"
                    variant="close"
                    onClick={() => {
                      resetForm();
                      closeModal();
                    }}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
