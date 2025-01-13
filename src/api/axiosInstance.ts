import axios from "axios";

export const api = axios.create({
  baseURL: "https://678559051ec630ca33a84762.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});