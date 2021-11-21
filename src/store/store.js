import { configureStore } from "@reduxjs/toolkit"
import authenticationSlice from "../features/authenticationSlice"
import createPostSlice from "../features/createPostSlice"
import userSlice from "../features/userSlice"
import postSlice from "./../features/postSlice"

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
    auth: authenticationSlice,
    createPostModal: createPostSlice,
  },
})

export default store
