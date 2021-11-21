import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { fetchPostDetail, fetchPostsByUserId } from "../features/postSlice"
import PostDetailView from "../components/post/PostDetailView"
import { Link } from "react-router-dom"
import PostGridItem from "../components/post/PostGridItem"
import NavMobile from "../components/header/NavMobile"
import ImageLoader from "../components/loader/ImageLoader"
import UserRecommendLoader from "./../components/loader/UserRecommendLoader"

const PostDetailPage = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { data: post, isLoading } = useSelector(
    (state) => state.post.postDetail
  )
  const comments = useSelector((state) => state.post.comments)
  const { posts } = useSelector((state) => state.post.postsByUserId)

  useEffect(() => {
    post &&
      Object.keys(post).length > 0 &&
      dispatch(fetchPostsByUserId(post.user_id))
  }, [post, dispatch])

  useEffect(() => {
    dispatch(fetchPostDetail(postId))
  }, [dispatch, postId])
  return (
    <section className="mt-11 md:mt-54 layout py-0 pb-10 md:py-8 px-0">
      <NavMobile title="Ảnh" />
      {isLoading ? (
        <div className="flex">
          <div className="w-7/12 mr-10">
            <ImageLoader className="" />
          </div>

          <div className="w-5/12">
            <UserRecommendLoader />
            <br />
            <UserRecommendLoader className="mb-3" />
            <UserRecommendLoader className="mb-3" />
            <UserRecommendLoader className="mb-3" />
            <UserRecommendLoader className="mb-3" />
            <UserRecommendLoader className="mb-3" />
            <UserRecommendLoader className="mb-3" />
          </div>
        </div>
      ) : (
        <PostDetailView post={post} comments={comments} />
      )}
      {post && Object.keys(post).length > 0 && (
        <section className="mt-12 border-t border-borderColor py-12 hidden md:block">
          <p className="text-sm font-semibold text-gray-500">
            Thêm các bài viết từ{" "}
            <Link to={`/user/${post.user_id}`} className="font-bold text-black">
              {post.user_name}
            </Link>
          </p>
          <section className="grid grid-cols-3 gap-7 mt-4">
            {posts?.length > 0 &&
              posts.slice(0, 6).map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <PostGridItem post={post} />
                </Link>
              ))}
          </section>
        </section>
      )}
    </section>
  )
}

export default PostDetailPage
