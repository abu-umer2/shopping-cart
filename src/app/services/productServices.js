import axios from "axios";
import dbserver from "../dbserver";
const ProductServices = {
  fetchProducts() {
    return axios.get(`http://${dbserver.server}:${dbserver.port}/products`);
  },
  fetchProductsBySub(subId) {
    return axios.get(
      `http://${dbserver.server}:${dbserver.port}/products/sub/${subId}`
    );
  },
  fetchCategories() {
    return axios.get(`http://${dbserver.server}:${dbserver.port}/categories`);
  },
  fetchSubCategories(category) {
    return axios.get(
      `http://${dbserver.server}:${dbserver.port}/sub-categories/subs/${category}`
    );
  },

  createProduct(formData) {
    const payload = formData;
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/products`,
      payload
    );
  },
  updateProduct(selectedProductId, formData) {
    const payload = formData;
    return axios.patch(
      `http://${dbserver.server}:${dbserver.port}/products/${selectedProductId}`,
      payload
    );
  },
  userLogin(username, password) {
    const payload = { username, password };
    console.log("log", payload);
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/auth/login`,
      payload
    );
  },
  userSignup(payload) {
    console.log("log", payload);
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/auth/signup`,
      payload
    );
  },
  searchProduct(query) {
    return axios.get(
      `http://${dbserver.server}:${dbserver.port}/products/search?query=${query}`
    );
  },
  searchCat(query) {
    return axios.get(
      `http://${dbserver.server}:${dbserver.port}/categories/search?query=${query}`
    );
  },
  searchSub(query) {
    return axios.get(
      `http://${dbserver.server}:${dbserver.port}/sub-categories/search?query=${query}`
    );
  },
};

export default ProductServices;
