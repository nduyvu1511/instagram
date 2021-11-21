import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import UserRecommend from "../components/user/UserRecommend"
import { fetchAllRecommendUsers, fetchFollowUser } from "../features/userSlice"

const PeoplePage = () => {
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const { data: users } = useSelector((state) => state.user.recommendUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllRecommendUsers())
  }, [dispatch])
  return (
    <section className="mt-54 py-6 lg:py-12 max-w-600 w-full px-6 mb-11 md:mb-0 lg:px-0 mx-auto">
      <div className="mb-4">
        <p className="text-15 font-semibold">Gợi ý</p>
      </div>
      {users?.length > 0 &&
        users.map((user) => (
          <div key={user._id} className="flex justify-between items-center">
            <UserRecommend key={user._id} type="peoplePage" user={user} />
            <div className="">
              <button
                onClick={() =>
                  dispatch(
                    fetchFollowUser({
                      currentId: loggedUser._id,
                      followerId: user._id,
                    })
                  )
                }
                className="bg-textBlue px-2 py-1 rounded-4 text-white font-medium text-sm"
              >
                Theo dõi
              </button>
            </div>
          </div>
        ))}
    </section>
  )
}

export default PeoplePage
