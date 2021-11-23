import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_ROOT_API,
  header: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data
    }
  },
  (error) => {
    throw error
  }
)

export default axiosClient
