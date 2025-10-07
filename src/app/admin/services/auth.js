import dbserver from "../../dbserver";
import axios from "axios";
const AuthServices = {
  CheckLogin(username, password) {
    const payload = { username, password };
    console.log("Sending login payload:", payload);
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/auth/login`,
      payload
    );
  },
  fetchProducts() {
    return axios.get(`http://${dbserver.server}:${dbserver.port}/products`);
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
};

export default AuthServices;
