import React from "react"
import { Link } from "react-router-dom"
import UserRecommend from "../user/UserRecommend"
import { useDispatch, useSelector } from "react-redux"
import { fetchFollowUser } from "../../features/userSlice"
import UserRecommendLoader from "../loader/UserRecommendLoader"

const SideBar = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const { data: recommendUsers, isLoading } = useSelector(
    (state) => state.user.recommendUsers
  )

  const getFollowerId = (followerId) => {
    dispatch(fetchFollowUser({ currentId: loggedUser._id, followerId }))
  }


  return (
    <>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <aside className="fixed w-293">
          {!isLoading ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="">
                    <Link to={`/user/${loggedUser._id}`}>
                      <img
                        src={loggedUser.avatar}
                        className="rounded-full object-cover w-14 h-14"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="text-sm ml-4">
                    <Link
                      to={`/user/${loggedUser._id}`}
                      className="text-black font-medium"
                    >
                      {loggedUser.user_name}
                    </Link>
                    <p className="text-gray-500">{loggedUser.name}</p>
                  </div>
                </div>
                <div className="">
                  <button className="text-textBlue text-xs text-normal">
                    Chuyển
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-5 my-3">
                <p className="text-sm font-semibold text-gray-500">
                  Gợi ý cho bạn
                </p>
                <Link to="/explore/people" className="text-xs font-medium">
                  Xem tất cả
                </Link>
              </div>
              <div className="">
                {recommendUsers?.length > 0 &&
                  recommendUsers
                    .slice(1, 6)
                    .map((user) => (
                      <UserRecommend
                        getFollowerId={getFollowerId}
                        key={user._id}
                        user={user}
                      />
                    ))}
              </div>
            </>
          ) : (
            <>
              <UserRecommendLoader />
              <br />
              <UserRecommendLoader />
              <UserRecommendLoader />
              <UserRecommendLoader />
              <UserRecommendLoader />
              <UserRecommendLoader />
            </>
          )}
        </aside>
      )}
    </>
  )
}

export default SideBar
