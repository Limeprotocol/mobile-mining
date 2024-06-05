import axios from "axios"

const BASE_URL = "https://app-ldc2uw7ika-uc.a.run.app/"
const TEST_URL = "https://zendata.ngrok.io/limeprotocol-cd9cf/us-central1/app/"

export default axios.create({
  baseURL: TEST_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const axiosAuth = axios.create({
  baseURL: TEST_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
