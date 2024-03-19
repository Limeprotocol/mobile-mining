import axios from "axios"

const BASE_URL =
  "https://zendata.ngrok.io/progetto-recupero-4ff23/us-central1/app/api"

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
