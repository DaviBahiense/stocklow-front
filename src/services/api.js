import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(signUpData) {
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData) {
  return baseAPI.post("/sign-in", signInData);
}

async function getProducts(token) {
  const config = getConfig(token);
  return baseAPI.get("/products", config);
}

async function getCategories() {
  return baseAPI.get("/categories");
}

async function createProduct(data, token) {
  const config = getConfig(token);
  return baseAPI.post("/products", data, config);
}

const api = {
  signUp,
  signIn,
  getProducts,
  getCategories,
  createProduct,
};

export default api;
