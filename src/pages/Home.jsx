import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PostItem from "../components/post/PostItem"
import SideBar from "../components/sidebar/SideBar"
import {
  fetchNewfeed,
  fetchLikePost,
  fetchUnlikePost,
} from "../features/postSlice"
import { fetchAllRecommendUsers, fetchLoggedUser } from "../features/userSlice"
import { withRouter } from "react-router"
import PostLoader from "../components/loader/PostLoader"
import { BsInstagram } from "react-icons/bs"

const Home = () => {
  
  const { data: posts, isLoading } = useSelector((state) => state.post.posts)

  const { data: loggedUser, isLoading: userLoading } = useSelector(
    (state) => state.user.loggedUser
  )
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  const handleLikePost = (postId) => {
    dispatch(fetchLikePost({ userId: loggedUser._id, postId }))
  }

  const handleUnlikePost = (postId) => {
    dispatch(fetchUnlikePost({ userId: loggedUser._id, postId }))
  }

  useEffect(() => {
    dispatch(fetchNewfeed(page))
  }, [page, dispatch])

  useEffect(() => {
    const getHeight = () => {
      if (document.documentElement.scrollTop > window.innerHeight * 8 * page) {
        setPage(page + 1)
      }
    }

    window.addEventListener("scroll", getHeight)

    return () => {
      window.removeEventListener("scroll", getHeight)
    }
  }, [page])

  useEffect(() => {
    dispatch(fetchLoggedUser())
    dispatch(fetchAllRecommendUsers())
  }, [dispatch])

  return (
    <>
      {userLoading ? (
        <div className="fixed bg-white right-0 left-0 z-2000 bottom-0 top-0 flex items-center justify-center">
          <BsInstagram className="text-4xl text-gray-500" />
        </div>
      ) : (
        loggedUser &&
        Object.keys(loggedUser).length > 0 && (
          <section className="layout px-0 mt-54 md:py-8">
            {Object.keys(loggedUser).length > 0 && (
              <section className="grid grid-cols-3 gap-6">
                <section className="col-span-3 ins:col-span-2 mx-auto">
                  {isLoading && (
                    <>
                      <PostLoader />
                      <br />
                      <br />
                      <PostLoader />
                    </>
                  )}
                  {posts?.length > 0 &&
                    posts.map((post) =>
                      loggedUser?.liked_post_id &&
                      loggedUser.liked_post_id.includes(post._id) ? (
                        <PostItem
                          isLoading={isLoading}
                          loggedUser={loggedUser}
                          listPostLiked={loggedUser.liked_post_id}
                          isLiked={true}
                          key={post._id}
                          handleUnlikePost={handleUnlikePost}
                          post={post}
                        />
                      ) : (
                        <PostItem
                          isLoading={isLoading}
                          loggedUser={loggedUser}
                          listPostLiked={loggedUser.liked_post_id}
                          key={post._id}
                          handleLikePost={handleLikePost}
                          post={post}
                        />
                      )
                    )}
                </section>
                <section className="hidden ins:block col-span-1">
                  <SideBar loggedUser={loggedUser} />
                </section>
              </section>
            )}
          </section>
        )
      )}
    </>
  )
}

export default withRouter(Home)
