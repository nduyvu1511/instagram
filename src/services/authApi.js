import axiosClient from "./axiosClient"

const authApi = {
  register: (formData) => {
    return axiosClient.post("users/register", formData)
  },

  login: (formData) => {
    return axiosClient.post(`users/login`, formData)
  },
  
  changePassword: ({ id, newPassword, currentPassword }) => {
    return axiosClient.patch(`users/${id}/change-password`, {
      newPassword,
      currentPassword,
    })
  },
}

export default authApi
