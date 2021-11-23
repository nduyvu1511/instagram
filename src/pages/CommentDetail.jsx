import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CommentItem from "../components/comments/CommentItem"
import AddComment from "../components/inputs/AddComment"
import { useParams } from "react-router"
import { fetchPostDetail } from "../features/postSlice"
import NavMobile from "../components/header/NavMobile"

const CommentDetail = () => {
  
  const { postId } = useParams()
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.post.comments)
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)

  useEffect(() => {
    dispatch(fetchPostDetail(postId))
  }, [postId, dispatch])

  return (
    <section className="layout mt-11 md:mt-54 mb-11 md:mb-0">
      <NavMobile title="Bình luận" />
      <div className="px-4 py-2 border top-10 flex items-center w-full fixed left-0 right-0 bg-bgGray border-b border-borderColor">
        <img
          src={loggedUser.avatar}
          className="w-8 h-8 rounded-full mr-4"
          alt=""
        />
        <AddComment type="commentDetail" postId={postId} />
      </div>
      <div className="p-3 md:hidden mt-28 flex-1 overflow-y-scroll hide-scrollbar -mx-5">
        <ul>
          {comments?.length > 0 &&
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                type="comment"
                commentId={comment._id}
                title={comment.title}
                avatar={comment.user_comment_avatar}
                userId={comment.user_id}
                user_name={comment.user_comment_name}
              />
            ))}
        </ul>
      </div>
    </section>
  )
}

export default CommentDetail
