import axiosClient from "./axiosClient"

const postApi = {
  getNewfeed: (page) => {
    return axiosClient.get(`posts/newfeed?page=${page}`, {})
  },

  getAllPosts: () => {
    return axiosClient.get("posts")
  },

  getPostByUserId: (id) => {
    return axiosClient.get(`posts/user/${id}`)
  },

  getPostDetail: (id) => {
    return axiosClient.get(`posts/${id}`)
  },

  getUserPage: (userId) => {
    return axiosClient.get(`posts/user/${userId}`)
  },

  createPost: (post) => {
    return axiosClient.post(`posts`, post)
  },

  deletePost: (postId) => {
    return axiosClient.delete(`posts/${postId}`)
  },

  likePost: ({ userId, postId }) => {
    return axiosClient.patch(`posts/${userId}/like/${postId}`)
  },
  
  unlikePost: ({ userId, postId }) => {
    return axiosClient.patch(`posts/${userId}/unlike/${postId}`)
  },
}

export default postApi
