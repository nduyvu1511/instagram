import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import uploadApi from "../services/uploadApi"
import postApi from "./../services/postApi"
import commentApi from "./../services/commentApi"

export const fetchNewfeed = createAsyncThunk(
  "post/fetchNewfeed",
  async (page) => {
    return await postApi.getNewfeed(page)
  }
)

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    return await postApi.getAllPosts()
  }
)

export const fetchPostsByUserId = createAsyncThunk(
  "post/fetchPostsByUserId",
  async (id) => {
    return await postApi.getPostByUserId(id)
  }
)

export const fetchCreatePost = createAsyncThunk(
  "post/fetchCreatePost",
  async (post) => {
    return await postApi.createPost(post)
  }
)

export const fetchPostDetail = createAsyncThunk(
  "post/fetchPostDetail",
  async (postId) => {
    return await postApi.getPostDetail(postId)
  }
)

export const fetchDeletePost = createAsyncThunk(
  "post/fetchDeletePost",
  async (postId) => {
    return await postApi.deletePost(postId)
  }
)

export const fetchLikePost = createAsyncThunk(
  "post/fetchLikePost",
  async ({ userId, postId }) => {
    return await postApi.likePost({ userId, postId })
  }
)

export const fetchUnlikePost = createAsyncThunk(
  "post/fetchUnlikePost",
  async ({ userId, postId }) => {
    return await postApi.unlikePost({ userId, postId })
  }
)

export const fetchDeleteImage = createAsyncThunk(
  "post/fetchDeleteImage",
  async (imageUrl) => {
    return await uploadApi.deleteImage(imageUrl)
  }
)

export const fetchAddComment = createAsyncThunk(
  "post/fetchAddComment",
  async ({ userId, comment }) => {
    return await commentApi.addComment({ userId, comment })
  }
)

export const fetchDeleteComment = createAsyncThunk(
  "post/fetchDeleteComment",
  async (commentId) => {
    return await commentApi.deleteComment(commentId)
  }
)

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: {
      data: [],
      isLoading: false,
    },
    postDetail: {
      data: {},
      isLoading: false,
    },
    postsByUserId: [],
    explorePosts: {
      isLoading: false,
      data: [],
    },
    statusLikePost: false,
    statusUnlikePost: false,
    comments: [],
    isLoading: false,
  },
  reducers: {
    handleDeletePostDetail: (state) => {
      state.postDetail = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddComment.fulfilled, (state, action) => {
      const { post_id } = action.payload
      state.posts.data = state.posts.data.map((post) => {
        if (post._id === post_id) {
          return { ...post, comments: post.comments + 1 }
        } else {
          return post
        }
      })
      state.comments.unshift(action.payload)
    })

    builder.addCase(fetchDeleteComment.fulfilled, (state, action) => {
      const { commentId } = action.payload
      state.comments = state.comments.filter(
        (comment) => comment._id !== commentId
      )
    })

    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.explorePosts.isLoading = false
      state.explorePosts.data = action.payload
    })

    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.explorePosts.isLoading = true
    })

    builder.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      state.postsByUserId = action.payload
    })

    builder.addCase(fetchNewfeed.fulfilled, (state, action) => {
      state.posts.isLoading = false
      state.posts.data = [...state.posts.data, ...action.payload]
    })

    builder.addCase(fetchNewfeed.pending, (state, action) => {
      state.posts.isLoading = true
    })

    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.posts.data = state.posts.data.filter(
        (post) => post._id !== action.payload.post_id
      )
    })

    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      state.posts.data.unshift(action.payload)
    })

    builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
      state.postDetail.isLoading = false
      state.postDetail.data = action.payload.post
      state.comments = action.payload.comments
    })

    builder.addCase(fetchPostDetail.pending, (state) => {
      state.postDetail.isLoading = true
    })

    builder.addCase(fetchLikePost.fulfilled, (state, action) => {
      state.statusLikePost = false
      const { post: postPayload } = action.payload
      state.postDetail.data = {
        ...state.postDetail.data,
        likes: postPayload.likes,
      }
      state.posts.data = state.posts.data.map((post) => {
        if (post._id === postPayload._id) {
          return { ...post, likes: postPayload.likes }
        } else {
          return post
        }
      })
    })

    builder.addCase(fetchLikePost.pending, (state) => {
      state.statusLikePost = true
    })

    builder.addCase(fetchUnlikePost.fulfilled, (state, action) => {
      state.statusUnlikePost = false
      const { post: postPayload } = action.payload
      state.postDetail.data = {
        ...state.postDetail.data,
        likes: postPayload.likes,
      }
      state.posts.data = state.posts.data.map((post) => {
        if (post._id === postPayload._id) {
          return { ...post, likes: postPayload.likes }
        } else {
          return post
        }
      })
    })

    builder.addCase(fetchUnlikePost.pending, (state) => {
      state.statusUnlikePost = true
    })
  },
})

export const { handleDeletePostDetail } = postSlice.actions
export default postSlice.reducer
