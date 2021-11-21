import React from "react"
import { Link } from "react-router-dom"

const UserItem = ({ type, user, setOpenSearch }) => {
  
  return (
    <div className={`flex items-center ${type === "search" && "py-2"}`}>
      <div
        className={`${
          type === "peoplePage"
            ? "w-11 h-11"
            : type === "search"
            ? "w-11 h-11"
            : "w-8 h-8"
        }`}
      >
        <Link onClick={() => setOpenSearch(false)} to={`/user/${user._id}`}>
          <img
            src={user.avatar}
            className={`rounded-full w-full h-full object-cover`}
            alt=""
          />
        </Link>
      </div>
      <div className="text-sm ml-4">
        <Link
          onClick={() => setOpenSearch(false)}
          to={`/user/${user._id}`}
          className="text-black hover:underline font-medium"
        >
          {user.user_name}
        </Link>
        {type === "peoplePage" && (
          <p className="text-textColor text-sm">{user.name}</p>
        )}
        {type === "search" ? (
          <p className="text-gray-500 text-xs">{user.user_name}</p>
        ) : (
          <p className="text-gray-500 text-xs">Gợi ý cho bạn</p>
        )}
      </div>
      {/* </Link> */}
    </div>
  )
}

export default UserItem
