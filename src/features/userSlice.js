import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import uploadApi from "../services/uploadApi"
import userApi from "./../services/userAPi"
import postApi from "./../services/postApi"
import {
  fetchCreatePost,
  fetchDeletePost,
  fetchLikePost,
  fetchUnlikePost,
} from "./postSlice"

export const fetchAllRecommendUsers = createAsyncThunk(
  "user/fetchAllRecommendUsers",
  async () => {
    return await userApi.getRecommendUsers()
  }
)

export const fetchSearchUsers = createAsyncThunk(
  "user/fetchSearchUsers",
  async () => {
    return await userApi.getSearchUsers()
  }
)

export const fetchFollowUser = createAsyncThunk(
  "user/fetchFollowUser",
  async ({ currentId, followerId }) => {
    return await userApi.followUser({ currentId, followerId })
  }
)

export const fetchUnFollowUser = createAsyncThunk(
  "user/fetchUnFollowUser",
  async ({ currentId, unfollowerId }) => {
    return await userApi.unFollowUser({ currentId, unfollowerId })
  }
)

export const fetchUpdateAvatar = createAsyncThunk(
  "user/fetchUpdateAvatar",
  async ({ data, id }) => {
    return await uploadApi.uploadAvatar({ data, id })
  }
)

export const fetchDeleteAvatar = createAsyncThunk(
  "post/fetchDeleteAvatar",
  async ({ avatarUrl, userId }) => {
    return await uploadApi.deleteAvatar({ avatarUrl, userId })
  }
)

export const fetchEditUser = createAsyncThunk(
  "user/fetchEditUser",
  async ({ id, formData }) => {
    return await userApi.editUser({ id, formData })
  }
)

export const fetchLoggedUser = createAsyncThunk(
  "user/fetchLoggedUser",
  async () => {
    try {
      return await userApi.getLoggedUser()
    } catch (error) {
      if (error?.response?.data) {
        console.log(error.response.data)
      }
    }
  }
)

export const fetchUploadBlankAvatar = createAsyncThunk(
  "user/fetchUploadBlankAvatar",
  async (id) => {
    return await userApi.uploadBlankAvatar(id)
  }
)

export const fetchGetPersonalPage = createAsyncThunk(
  "user/fetchGetPersonalPage",
  async (userId) => {
    return await postApi.getUserPage(userId)
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    recommendUsers: {
      isLoading: null,
      data: [],
    },
    loggedUser: {
      data: {},
      isLoading: false,
    },
    searchUsers: [],
    initSearchUsers: [],
    statusChangePassword: null,
    editStatus: null,
    userPage: {
      info: {},
      posts: [],
    },
  },
  reducers: {
    fetchDeletePersonalPage: (state, action) => {
      state.userPage = {}
    },
    deleteEditStatus: (state) => {
      state.editStatus = ""
    },
    handleSearchUser: (state, action) => {
      state.searchUsers = [...state.initSearchUsers]
      state.searchUsers = state.searchUsers.filter(
        (user) =>
          user.name
            .toLocaleLowerCase()
            .includes(action.payload.searchValue.toLocaleLowerCase()) ||
          user.user_name
            .toLocaleLowerCase()
            .includes(action.payload.searchValue.toLocaleLowerCase())
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRecommendUsers.fulfilled, (state, action) => {
      state.recommendUsers.data = action.payload
      state.recommendUsers.isLoading = false
    })

    builder.addCase(fetchUploadBlankAvatar.fulfilled, (state, action) => {
      state.loggedUser.data.avatar = action.payload.avatar
    })

    builder.addCase(fetchAllRecommendUsers.pending, (state) => {
      state.recommendUsers.isLoading = true
    })

    builder.addCase(fetchEditUser.fulfilled, (state, action) => {
      state.editStatus = "Đã lưu trang cá nhân."
      state.loggedUser.data = action.payload
    })

    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      if (state.userPage?.posts) {
        state.userPage.posts = state.userPage.posts.filter(
          (post) => post._id !== action.payload.post_id
        )
      }
    })

    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      state?.userPage?.posts && state.userPage.posts.unshift(action.payload)
    })

    builder.addCase(fetchSearchUsers.fulfilled, (state, action) => {
      state.searchUsers = action.payload
      state.initSearchUsers = action.payload
    })

    builder.addCase(fetchDeleteAvatar.fulfilled, (state) => {
      state.loggedUser.data.avatar = ""
      state.userPage.info.avatar = ""
    })

    builder.addCase(fetchGetPersonalPage.fulfilled, (state, action) => {
      state.userPage = action.payload
    })

    builder.addCase(fetchLoggedUser.fulfilled, (state, action) => {
      state.loggedUser.isLoading = false
      state.loggedUser.data = action.payload
    })

    builder.addCase(fetchLoggedUser.pending, (state) => {
      state.loggedUser.isLoading = true
    })

    builder.addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
      state.loggedUser.data.avatar = action.payload.fileNameInServer
      state.userPage.info.avatar = action.payload.fileNameInServer
    })

    builder.addCase(fetchFollowUser.fulfilled, (state, action) => {
      const { currentId, followerId } = action.payload
      state.loggedUser.data.following_ids.push(followerId)
      state?.userPage?.info?.is_followed_by_ids &&
        state.userPage.info.is_followed_by_ids.push(currentId)
      state.recommendUsers.data = state.recommendUsers.data.filter(
        (user) => user._id !== followerId
      )
    })

    builder.addCase(fetchUnFollowUser.fulfilled, (state, action) => {
      const { unfollowerId } = action.payload
      state.loggedUser.data.following_ids =
        state.loggedUser.data.following_ids.filter((id) => id !== unfollowerId)
      state?.userPage?.info?.is_followed_by_ids &&
        state.userPage.info.is_followed_by_ids.pop()
    })

    builder.addCase(fetchLikePost.fulfilled, (state, action) => {
      const { user: userPayload } = action.payload
      state.loggedUser.data.liked_post_id = userPayload.liked_post_id
    })

    builder.addCase(fetchUnlikePost.fulfilled, (state, action) => {
      const { user: userPayload } = action.payload
      state.loggedUser.data.liked_post_id = userPayload.liked_post_id
    })
  },
})

export const { fetchDeletePersonalPage, handleSearchUser, deleteEditStatus } =
  userSlice.actions
export default userSlice.reducer
