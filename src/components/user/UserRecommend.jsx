import React from "react"
import { Link } from "react-router-dom"

const UserRecommend = ({ user, type, getFollowerId }) => {
  
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <div className={`${type === "peoplePage" ? "w-11 h-11" : "w-8 h-8"}`}>
          <Link to={`/user/${user._id}`}>
            <img
              src={user.avatar}
              className={`rounded-full w-full h-full object-cover`}
              alt=""
            />
          </Link>
        </div>
        <div className="text-sm ml-4">
          <Link
            to={`/user/${user._id}`}
            className="text-black hover:underline font-medium"
          >
            {user.user_name}
          </Link>
          {type === "peoplePage" && (
            <p className="text-textColor text-sm">{user.name}</p>
          )}
          <p className="text-gray-500 text-xs">Gợi ý cho bạn</p>
        </div>
      </div>
      {type !== "peoplePage" && (
        <div className="">
          <button
            onClick={() => getFollowerId && getFollowerId(user._id)}
            className="text-textBlue text-xs text-normal"
          >
            Theo dõi
          </button>
        </div>
      )}
    </div>
  )
}

export default UserRecommend
