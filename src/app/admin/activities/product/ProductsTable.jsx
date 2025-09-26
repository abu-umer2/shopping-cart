import React from "react";

const ProductsTable = ({ products }) => {
  return (
    <div className="container mt-3">
      <table class="table table-striped">
        <tr>
          <th>Product Name</th>
          <th>Product Category</th>
          <th>Product Sub-category</th>
          <th>Product Price</th>

          <th>Product Action</th>
        </tr>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>
                {Array.isArray(product.categoriesId)
                  ? product.categoriesId.map((cat) => cat.name).join(", ")
                  : product.categoriesId?.name || "No Category"}
              </td>
              <td>
                {Array.isArray(product.subCategoriesId)
                  ? product.subCategoriesId.map((sub) => sub.name).join(", ")
                  : product.subCategoriesId?.name || "No Subcategory"}
              </td>
              <td>{product.price}</td>

              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary">Update</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
