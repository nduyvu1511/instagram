import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import { fetchDeleteImage, fetchDeletePost } from "../../features/postSlice"
import { fetchFollowUser, fetchUnFollowUser } from "../../features/userSlice"
import { MdClose } from "react-icons/md"

const PostOptionModal = ({ post, isOpenModal, setOpenModal, type }) => {
  
  const { _id: postId, user_id: userId } = post
  const dispatch = useDispatch()
  const history = useHistory()

  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)

  const handleDeletePostById = (postId) => {
    dispatch(fetchDeletePost(postId))
    type === "pageDetail" && history.goBack()
  }
  const handleDeleteImage = (imageUrl) => {
    const imageUrlFormat = imageUrl.split("images/")[1]
    dispatch(fetchDeleteImage(imageUrlFormat))
  }

  return (
    <div
      className={`modal 
        ${isOpenModal ? "flex" : "hidden"}`}
    >
      <div onClick={() => setOpenModal(false)} className={`overlay`}></div>
      <button className="absolute top-4 right-4">
        <MdClose />
      </button>
      <div className="bg-white rounded-xl absolute z-2 w-64 md:w-400">
        <ul className="w-full h-full">
          {loggedUser?._id && loggedUser._id === userId ? (
            <li
              onClick={() => {
                handleDeletePostById(post._id)
                handleDeleteImage(post.images[0])
                setOpenModal(false)
              }}
              className="cursor-pointer text-red-500 text-sm text-center font-bold py-4 border-b border-borderColor"
            >
              Xóa bài viết
            </li>
          ) : loggedUser?.following_ids &&
            loggedUser.following_ids.includes(userId) ? (
            <li
              onClick={() => {
                loggedUser?._id &&
                  dispatch(
                    fetchUnFollowUser({
                      currentId: loggedUser._id,
                      unfollowerId: userId,
                    })
                  )
                setOpenModal(false)
              }}
              className="cursor-pointer text-red-500 text-sm text-center font-bold py-4 border-b border-borderColor"
            >
              Bỏ theo dõi
            </li>
          ) : (
            <li
              onClick={() => {
                loggedUser?._id &&
                  dispatch(
                    fetchFollowUser({
                      currentId: loggedUser._id,
                      followerId: userId,
                    })
                  )
                setOpenModal(false)
              }}
              className="cursor-pointer text-red-500 text-sm text-center font-bold py-4 border-b border-borderColor"
            >
              Theo dõi
            </li>
          )}
          <li
            onClick={() => setOpenModal(false)}
            className="cursor-pointer text-sm text-center font-normal py-4 border-b border-borderColor"
          >
            <Link
              to={`/user/${userId}`}
              className="cursor-pointer text-sm text-center font-normal"
            >
              Xem trang cá nhân
            </Link>
          </li>
          {type !== "pageDetail" && (
            <li className="cursor-pointer py-4 border-b border-borderColor">
              <Link
                to={`post/${postId}`}
                className="cursor-pointer text-sm w-full h-full inline-block text-center font-normal"
              >
                Đi tới bài viết
              </Link>
            </li>
          )}
          <li
            onClick={() => setOpenModal(false)}
            className="cursor-pointer text-sm text-center font-normal py-4"
          >
            Hủy
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PostOptionModal
