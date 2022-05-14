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

async function getData(token) {
  const config = getConfig(token);
  return baseAPI.get("/", config);
}

const api = {
  signUp,
  signIn,
  getData,
};

export default api;