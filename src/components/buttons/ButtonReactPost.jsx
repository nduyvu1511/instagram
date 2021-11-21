import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLikePost, fetchUnlikePost } from "../../features/postSlice"
import { heartFillIcon, heartIcon } from "../../public/icon/icons"

const ButtonReactPost = ({ isLiked, userId, postId }) => {
  const dispatch = useDispatch()
  const statusLikePost = useSelector((state) => state.post.statusLikePost)
  const statusUnlikePost = useSelector((state) => state.post.statusUnlikePost)
  return (
    <>
      {isLiked === true ? (
        <button
          onClick={() =>
            !statusUnlikePost &&
            dispatch(fetchUnlikePost({ userId: userId, postId }))
          }
        >
          {heartFillIcon(24, 24)}
        </button>
      ) : (
        <button
          onClick={() =>
            !statusLikePost &&
            dispatch(fetchLikePost({ userId: userId, postId }))
          }
        >
          {heartIcon(24, 24)}
        </button>
      )}
    </>
  )
}

export default ButtonReactPost
