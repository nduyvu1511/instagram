import axiosClient from "./axiosClient"

const userApi = {
  getLoggedUser: () => {
    return axiosClient.get("users/logged")
  },

  getRecommendUsers: () => {
    return axiosClient.get("users/recommend")
  },

  getSearchUsers: () => {
    return axiosClient.get(`users/search`)
  },

  followUser: ({ currentId, followerId }) => {
    return axiosClient.patch(`users/${currentId}/follow/${followerId}`)
  },

  unFollowUser: ({ currentId, unfollowerId }) => {
    return axiosClient.patch(`users/${currentId}/unfollow/${unfollowerId}`)
  },

  editUser: ({ id, formData }) => {
    return axiosClient.patch(`users/${id}/edit`, formData)
  },

  uploadBlankAvatar: (id) => {
    return axiosClient.patch(`users/${id}/blank-avatar`)
  },
}

export default userApi
