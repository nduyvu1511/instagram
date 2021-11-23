import "react-loading-skeleton/dist/skeleton.css"
import "../index.css"

import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchAllPosts, fetchPostDetail } from "../features/postSlice"
import { useSelector } from "react-redux"
import PostGridItem from "./../components/post/PostGridItem"
import { FiSearch } from "react-icons/fi"
import { useHistory } from "react-router"
import PostDetailView from "../components/post/PostDetailView"
import PostItemLoader from "./../components/loader/PostItemLoader"

const Explore = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [currentPostId, setCurrentPostId] = useState()
  const {data: loggedUser} = useSelector((state) => state.user.loggedUser)
  const { data: posts, isLoading } = useSelector(
    (state) => state.post.explorePosts
  )

  const post = useSelector((state) => state.post.postDetail)
  const comments = useSelector((state) => state.post.comments)
  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  useEffect(() => {
    currentPostId && dispatch(fetchPostDetail(currentPostId))
  }, [currentPostId, dispatch])

  return (
    <>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <>
          <section className="layout py-0 md:py-8 px-0 md:px-6 lg:px-0 auto-rows-min mt-54 mb-11 md:mb-0">
            <div className="flex items-center justify-center md:hidden fixed top-0 left-0 right-0 h-54 px-4 bg-white z-999">
              <input
                onFocus={() => history.push("/explore/search")}
                type="text"
                className="w-full outline-none border rounded-4 h-8 text-gray-600 text-sm font-normal text-center"
                placeholder="Tìm kiếm"
              />
              <FiSearch className="absolute text-xs text-gray-500 left-1/3 transform top-1/2 -translate-y-1/2" />
            </div>
            <div className="grid grid-cols-3 gap-2px md:gap-6">
              {isLoading ? (
                <>
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                  <PostItemLoader className="block md:hidden" />
                </>
              ) : (
                posts?.length > 0 &&
                posts.map((post) => (
                  <PostGridItem
                    setCurrentPostId={(id) => setCurrentPostId(id)}
                    key={post._id}
                    post={post}
                  />
                ))
              )}
            </div>
          </section>

          {currentPostId && (
            <section className="fixed top-0 right-0 left-0 bottom-0 z-1000 px-40 py-10 flex items-center justify-center">
              <div
                onClick={() => {
                  setCurrentPostId(null)
                }}
                className="absolute z-2 top-0 right-0 left-0 bottom-0 bg-black85"
              ></div>
              <div className="absolute z-10">
                <PostDetailView
                  type="userPage"
                  post={post}
                  loggedUser={loggedUser}
                  comments={comments}
                />
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}

export default Explore
