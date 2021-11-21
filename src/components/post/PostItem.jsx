import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  commentICon,
  heartFillIcon,
  heartIcon,
  optionIcon,
  savePostIcon,
} from "../../public/icon/icons"
import AddComment from "../inputs/AddComment"
import PostOptionModal from "../modals/PostOptionModal"
import ImageLoader from "../loader/ImageLoader"
import { useSelector } from "react-redux"
import PostLoader from "../loader/PostLoader"

const PostItem = ({
  post,
  handleLikePost,
  isLiked,
  handleUnlikePost,
  isLoading,
}) => {
  const statusLikePost = useSelector((state) => state.post.statusLikePost)
  const statusUnlikePost = useSelector((state) => state.post.statusUnlikePost)
  const [isOpenModal, setOpenModal] = useState(false)
  return (
    <>
      {isLoading && !post ? (
        <PostLoader type="postItem" />
      ) : (
        post &&
        Object.keys(post).length > 5 && (
          <div className="border rounded-2 mb-6 w-full sm:w-600">
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8">
                  <Link to={`/user/${post.user_id}`}>
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={post.avatar}
                      alt=""
                    />
                  </Link>
                </div>
                <Link
                  to={`/user/${post.user_id}`}
                  className="ml-5 hover:underline text-sm font-semibold"
                >
                  {post?.user_name && post.user_name}
                </Link>
              </div>
              <div className="">
                <button onClick={() => setOpenModal(true)}>
                  {optionIcon(24, 24)}
                </button>

                <PostOptionModal
                  post={post}
                  isOpenModal={isOpenModal}
                  setOpenModal={() => setOpenModal(false)}
                />
              </div>
            </div>
            <div
              onDoubleClick={() => {
                !isLiked && handleLikePost && handleLikePost(post._id)
              }}
            >
              {post?.images ? (
                <img
                  src={post.images[0]}
                  alt="..."
                  className="max-h-600 min-h-400 w-full object-cover "
                />
              ) : (
                <ImageLoader />
              )}
            </div>
            <div className="">
              <div className="px-5">
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center">
                    {isLiked ? (
                      <button
                        onClick={() =>
                          handleUnlikePost &&
                          !statusUnlikePost &&
                          handleUnlikePost(post._id)
                        }
                      >
                        {heartFillIcon(24, 24)}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleLikePost &&
                          !statusLikePost &&
                          handleLikePost(post._id)
                        }
                      >
                        {heartIcon(24, 24)}
                      </button>
                    )}
                    <Link to={`/post/${post._id}`} className="ml-4">
                      {commentICon(24, 24)}
                    </Link>
                  </div>
                  <div className="">
                    <button>{savePostIcon(24, 24)}</button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">
                    {post.likes
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    lượt thích
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-13 text-gray-700 font-normal line-clamp-2">
                    {post._username} {post.title}
                  </p>
                </div>
                <div className="mt-2">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-sm text-gray-500 font-normal"
                  >
                    Xem tất cả {post.comments} bình luận
                  </Link>
                </div>
              </div>
              <div className="mt-3 border-t px-5 py-3">
                <AddComment postId={post._id} />
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default PostItem
