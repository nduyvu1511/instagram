import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchLikePost, handleDeletePostDetail } from "../../features/postSlice"
import { useHistory } from "react-router"
import ButtonReactPost from "../buttons/ButtonReactPost"
import CommentItem from "../comments/CommentItem"
import AddComment from "../inputs/AddComment"
import { useDispatch, useSelector } from "react-redux"
import PostOptionModal from "../modals/PostOptionModal"
import { fetchFollowUser, fetchUnFollowUser } from "../../features/userSlice"
import { commentICon, optionIcon, savePostIcon } from "../../public/icon/icons"
import "../../index.css"

const PostDetailView = ({ post, comments, type }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isOpenModal, setOpenModal] = useState(false)
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const statusLikePost = useSelector((state) => state.post.statusLikePost)

  useEffect(() => {
    return () => {
      dispatch(handleDeletePostDetail())
    }
  }, [dispatch])

  return (
    <section className="layout px-0">
      {loggedUser &&
        Object.keys(loggedUser).length > 0 &&
        post &&
        Object.keys(post).length > 0 &&
        post.images?.length > 0 && (
          <section className={`grid grid-cols-12 ins:h-600`}>
            <>
              <div className="flex md:hidden items-center p-3 col-span-12 border-b justify-between">
                <div className="flex items-center">
                  <Link to={`/user/${post.user_id}`}>
                    <img
                      src={post.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </Link>
                  <Link
                    to={`/user/${post.user_id}`}
                    className="text-sm font-semibold mx-3"
                  >
                    {post.user_name}
                  </Link>
                  {loggedUser._id !== post.user_id &&
                    (loggedUser?.following_ids &&
                    loggedUser.following_ids.includes(post.user_id) ? (
                      <button
                        onClick={() =>
                          dispatch(
                            fetchUnFollowUser({
                              currentId: loggedUser._id,
                              unfollowerId: post.user_id,
                            })
                          )
                        }
                        className="font-semibold text-13"
                      >
                        Đang theo dõi
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            fetchFollowUser({
                              currentId: loggedUser._id,
                              followerId: post.user_id,
                            })
                          )
                        }
                        className="text-textBlue font-semibold text-13"
                      >
                        Theo dõi
                      </button>
                    ))}
                </div>
                <div className="">
                  <button onClick={() => setOpenModal(true)}>
                    {optionIcon()}
                  </button>
                </div>
              </div>
              <section
                onDoubleClick={() => {
                  if (
                    loggedUser?.liked_post_id &&
                    !loggedUser.liked_post_id.includes(post._id)
                  ) {
                    !statusLikePost &&
                      dispatch(
                        fetchLikePost({
                          userId: loggedUser._id,
                          postId: post._id,
                        })
                      )
                  }
                }}
                className={`overflow-hidden h-full max-h-600 ${
                  type === "userPage"
                    ? "col-span-6"
                    : "col-span-12 md:col-span-7 lg:col-span-7"
                }`}
              >
                <img
                  src={post.images[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </section>

              <section
                className={`h-full flex flex-col justify-between overflow-hidden border border-borderColor border-left-0 bg-white ${
                  type === "userPage"
                    ? "col-span-6"
                    : "col-span-12 md:col-span-5 lg:col-span-5"
                }`}
              >
                <div className="hidden md:flex items-center p-3 border-b justify-between">
                  <div className="flex items-center">
                    <Link to={`/user/${post.user_id}`}>
                      <img
                        src={post.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    </Link>
                    <Link
                      to={`/user/${post.user_id}`}
                      className="text-sm font-semibold mx-3"
                    >
                      {post.user_name}
                    </Link>
                    {post?.user_id !== loggedUser._id &&
                      (loggedUser?.following_ids &&
                      loggedUser.following_ids.includes(post.user_id) ? (
                        <button
                          onClick={() =>
                            dispatch(
                              fetchUnFollowUser({
                                currentId: loggedUser._id,
                                unfollowerId: post.user_id,
                              })
                            )
                          }
                          className="font-semibold text-13"
                        >
                          Đang theo dõi
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            dispatch(
                              fetchFollowUser({
                                currentId: loggedUser._id,
                                followerId: post.user_id,
                              })
                            )
                          }
                          className="text-textBlue font-semibold text-13"
                        >
                          Theo dõi
                        </button>
                      ))}
                  </div>
                  <div className="">
                    <button onClick={() => setOpenModal(true)}>
                      {optionIcon()}
                    </button>
                  </div>
                </div>
                <div className="p-3 hidden md:block overflow-y-scroll hide-scrollbar h-380">
                  <CommentItem
                    title={post.title}
                    avatar={post.avatar}
                    userId={post.user_id}
                    user_name={post.user_name}
                  />
                  <ul>
                    {comments?.length > 0 &&
                      comments.map((comment) => (
                        <CommentItem
                          type="comment"
                          key={comment._id}
                          commentId={comment._id}
                          title={comment.title}
                          avatar={comment.user_comment_avatar}
                          userId={comment.user_id}
                          user_name={comment.user_comment_name}
                        />
                      ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="border-t p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {loggedUser?.liked_post_id &&
                        loggedUser.liked_post_id.includes(post._id) ? (
                          <ButtonReactPost
                            isLiked={true}
                            userId={loggedUser._id}
                            postId={post._id}
                          />
                        ) : (
                          <ButtonReactPost
                            isLiked={false}
                            userId={loggedUser._id}
                            postId={post._id}
                          />
                        )}
                        <button
                          onClick={() =>
                            history.push(`/post/${post._id}/comments`)
                          }
                          className="ml-3 pointer-events-auto md:pointer-events-none cursor-pointer"
                        >
                          {commentICon()}
                        </button>
                      </div>
                      <div className="">
                        <button>{savePostIcon()}</button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm font-medium">
                        {post.likes
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        lượt thích
                      </p>
                    </div>

                    <div className="md:hidden mt-1">
                      <p className="text-13 font-normal text-black">
                        <Link
                          to={`/user/${post.user_id}`}
                          className="text-13 font-semibold text-black"
                        >
                          {post.user_name}
                        </Link>{" "}
                        {post.title}
                      </p>
                    </div>

                    <div className="mt-1">
                      <p className="font-light text-xs text-gray-500">
                        {post.updatedAt}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-4 border-t hidden md:block border-borderColor">
                    <AddComment postId={post._id} />
                  </div>
                </div>
              </section>
            </>
          </section>
        )}
      {/* Modal */}

      {post && Object.keys(post).length > 0 && (
        <PostOptionModal
          type="pageDetail"
          post={post}
          isOpenModal={isOpenModal}
          setOpenModal={() => setOpenModal(false)}
        />
      )}
    </section>
  )
}

export default PostDetailView
