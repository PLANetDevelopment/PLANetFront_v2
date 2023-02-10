import axios from "axios";

const client = axios.create({
  baseURL: "https://xn--lj2bx51av9j.xn--yq5b.xn--3e0b707e:8080/api",
});

client.interceptors.request.use((request) => {
  const userId = window.localStorage.getItem("userId");
  request.headers.userId = userId;
  return request;
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(error);
  }
);

export default client;
