import React, { useState } from "react"
import { Link } from "react-router-dom"
import { optionIcon } from "../../public/icon/icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchDeleteComment } from "../../features/postSlice"

const CommentItem = ({ title, commentId, avatar, userId, user_name, type }) => {
  const dispatch = useDispatch()
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const [openModal, setOpenModal] = useState(false)

  const handleDeleteComment = () => {
    dispatch(fetchDeleteComment(commentId))
  }

  return (
    <li className="mb-5 list-none">
      <div className="flex ">
        <div className="w-8">
          <Link className="w-full" to={`/user/${userId}`}>
            <img
              src={avatar}
              className="w-8 h-8 rounded-full border object-cover"
              alt=""
            />
          </Link>
        </div>
        <div className="flex-1 mx-3">
          <div>
            <Link
              to={`/user/${userId}`}
              className="text-sm hover:underline font-medium"
            >
              {user_name && user_name}
            </Link>
            <span className="ml-2 text-13 text-gray-700">{title}</span>
          </div>
        </div>
        {loggedUser?._id === userId && type === "comment" ? (
          <>
            <button onClick={() => setOpenModal(true)}>
              {optionIcon(24, 24)}
            </button>
            <div className={`modal ${openModal ? "flex" : "hidden"}`}>
              <div
                onClick={() => setOpenModal(false)}
                className="overlay"
              ></div>
              <div className="bg-white rounded-5 z-1 px-3 w-400">
                <div className="text-center py-5 font-semibold text-red-500">
                  Xóa bình luận?
                </div>
                <div
                  onClick={() => {
                    setOpenModal(false)
                    handleDeleteComment()
                  }}
                  className="py-4 w-full text-semibold font-semibold text-red-500 text-center border-t border-borderColor cursor-pointer"
                >
                  Xóa
                </div>
                <div
                  onClick={() => setOpenModal(false)}
                  className="py-4 w-full font-semibold border-t border-borderColor text-center cursor-pointer"
                >
                  Hủy
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-6"></div>
        )}
      </div>
    </li>
  )
}

export default CommentItem
