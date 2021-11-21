import { createSlice } from "@reduxjs/toolkit"

const createPostSlice = createSlice({
  name: "createPostModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openCreatePostModal: (state) => {
      state.isOpen = true
    },
    closeCreatePostModal: (state) => {
      state.isOpen = false
    },
  },
})

export default createPostSlice.reducer

export const { openCreatePostModal, closeCreatePostModal } =
  createPostSlice.actions
