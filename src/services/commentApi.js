import axiosClient from "./axiosClient"

const commentApi = {
  addComment: ({ userId, comment }) => {
    return axiosClient.post(`comments/${userId}`, comment)
  },

  deleteComment: (commentId) => {
    return axiosClient.delete(`comments/${commentId}`)
  },
}

export default commentApi
