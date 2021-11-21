import axiosClient from "./axiosClient"

const uploadApi = {
  uploadAvatar: ({ id, data }) => {
    return axiosClient.post(`upload/avatar/${id}`, data)
  },
  
  deleteAvatar: ({ avatarUrl, userId }) => {
    return axiosClient.delete(`upload/avatar/${avatarUrl}/${userId}`)
  },

  deleteImage: (imageUrl) => {
    return axiosClient.delete(`upload/image/${imageUrl}`)
  },

  postImage: (data) => {
    return axiosClient.post(`http://localhost:8080/upload/image`, data)
  },
}

export default uploadApi
