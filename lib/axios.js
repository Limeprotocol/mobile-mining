import axios from "axios"

const BASE_URL =
  "http://127.0.0.1:5001/progetto-recupero-4ff23/us-central1/app/"

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
