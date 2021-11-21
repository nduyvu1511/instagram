import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  fetchDeleteAvatar,
  fetchDeletePersonalPage,
  fetchFollowUser,
  fetchGetPersonalPage,
  fetchUnFollowUser,
  fetchUpdateAvatar,
  fetchUploadBlankAvatar,
} from "../features/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PostGridItem from "../components/post/PostGridItem"
import PostDetailView from "../components/post/PostDetailView"
import { fetchPostDetail } from "../features/postSlice"
import NavMobile from "../components/header/NavMobile"
import ImageLoader from "./../components/loader/ImageLoader"

const UserPage = () => {
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { info: user, posts } = useSelector((state) => state.user.userPage)
  const [currentPostId, setCurrentPostId] = useState(null)
  const { data: post, isLoading } = useSelector(
    (state) => state.post.postDetail
  )
  const comments = useSelector((state) => state.post.comments)
  const [isFollowIdUser, setFollowIdUser] = useState()
  const [avatarName, setAvatarName] = useState()
  const [isModalOpen, setModalOpen] = useState()

  useEffect(() => {
    if (avatarName && loggedUser?.avatar) {
      handleDeleteAvatar()
    }

    if (avatarName && loggedUser?._id) {
      const data = new FormData()
      data.append("avatarName", avatarName)
      setTimeout(() => {
        dispatch(fetchUpdateAvatar({ data, id: loggedUser._id }))
      }, 100)
    }
  }, [avatarName, dispatch])

  useEffect(() => {
    const idFollow =
      loggedUser?.following_ids &&
      loggedUser.following_ids.find((followingId) => followingId === id)
    setFollowIdUser(idFollow)
  }, [loggedUser, id])

  useEffect(() => {
    currentPostId && dispatch(fetchPostDetail(currentPostId))
  }, [currentPostId, dispatch])

  useEffect(() => {
    dispatch(fetchGetPersonalPage(id))
    return () => {
      dispatch(fetchDeletePersonalPage())
    }
  }, [dispatch, id])

  const handleDeleteAvatar = () => {
    if (loggedUser?.avatar && loggedUser?._id) {
      if (
        loggedUser.avatar ===
        `${process.env.REACT_APP_ROOT_API}/avatars/avatar.jpg`
      )
        return

      const avatarUrl = loggedUser.avatar.split("avatars/")[1]
      dispatch(fetchDeleteAvatar({ avatarUrl, userId: loggedUser._id }))
    }
  }

  useEffect(() => {
    if (!loggedUser.avatar) {
      loggedUser?._id && dispatch(fetchUploadBlankAvatar(loggedUser._id))
    }
  }, [loggedUser.avatar, dispatch])

  return (
    <section className="layout px-0 md:px-3 mt-54 pb-10">
      {user?.user_name && <NavMobile title={user.user_name} />}
      <section className="py-4 md:py-10 md:border-b border-borderColor px-5 md:px-0">
        {user && Object.keys(user).length > 0 && (
          <div className="flex">
            <div className="md:w-4/12">
              <input
                type="file"
                id="fileButton"
                className="hidden"
                accept="image/*"
                onChange={(e) => setAvatarName(e.target.files[0])}
              />
              {loggedUser?._id !== user._id ? (
                <div className=" w-20 md:w-auto">
                  <img
                    className="w-20 h-20 md:w-150 md:h-150 object-cover rounded-full md:mx-auto"
                    src={user.avatar}
                    alt=""
                  />
                </div>
              ) : loggedUser.avatar !==
                  `${process.env.REACT_APP_ROOT_API}/avatars/avatar.jpg` ||
                loggedUser.avatar === "" ? (
                <div
                  onClick={() => setModalOpen(true)}
                  className="cursor-pointer w-20 md:w-auto"
                >
                  <img
                    className="w-20 h-20 md:w-150 md:h-150 object-cover rounded-full mx-auto"
                    src={loggedUser.avatar}
                    alt=""
                  />
                </div>
              ) : (
                <label htmlFor="fileButton" className="cursor-pointer">
                  <img
                    className="w-150 h-150 object-cover rounded-full mx-auto"
                    src={loggedUser.avatar}
                    alt=""
                  />
                </label>
              )}
            </div>
            <div className="ml-0 md:ml-10 w-full md:w-8/12">
              <div className="ml-8 md:ml-0 flex flex-col md:flex-row md:items-center">
                <p className="text-2xl font-light">{user.user_name}</p>
                {loggedUser?._id === id ? (
                  <>
                    <Link
                      to="/accounts/edit"
                      className="rounded-2 border px-2 py-1 mt-2 md:mt-0 my-2 md:my-0 md:mx-3 text-sm font-medium max-w-250 text-center"
                    >
                      Chỉnh sửa trang cá nhân
                    </Link>
                  </>
                ) : (
                  <>
                    {loggedUser && isFollowIdUser ? (
                      <button
                        onClick={() =>
                          dispatch(
                            fetchUnFollowUser({
                              currentId: loggedUser._id,
                              unfollowerId: user._id,
                            })
                          )
                        }
                        className="btn bg-gray-400 text-white rounded-4 px-3 mt-2 md:mt-0 max-w-250 md:ml-6"
                      >
                        Bỏ theo dõi
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            fetchFollowUser({
                              currentId: loggedUser._id,
                              followerId: user._id,
                            })
                          )
                        }
                        className="btn px-3 rounded-4 mt-2 md:mt-0 max-w-250 md:ml-6"
                      >
                        Theo dõi
                      </button>
                    )}
                  </>
                )}
              </div>
              {/* ... */}
              <div className="hidden md:block mt-4">
                <div className="flex items-center">
                  <p className="block">
                    <span className="font-medium">{posts.length}</span> bài viết
                  </p>
                  <p className="mx-8">
                    <span className="font-medium">
                      {user.is_followed_by_ids.length}
                    </span>{" "}
                    người theo dõi
                  </p>
                  <p className="">
                    {" "}
                    Đang theo dõi{" "}
                    <span className="font-medium">
                      {user.following_ids.length}
                    </span>{" "}
                    người dùng
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-15 font-semibold">{user.name}</p>
                  <p className="text-15 font-normal mt-1">{user.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {user && Object.keys(user).length > 0 && (
        <div className="pb-4 block md:hidden border-b px-5 border-borderColor">
          <p className="text-15 font-semibold">{user.name}</p>
          <p className="text-15 mt-1 font-normal text-gray-700">
            {user.description}
          </p>
        </div>
      )}
      {/* Info on show on mobile */}
      {user && Object.keys(user).length > 0 && (
        <div className="text-base font-normal py-2 block md:hidden border-b border-color mb-1px">
          <div className="text-base font-normal">
            <div className="flex justify-center">
              <div className="w-1/3 text-center">
                <p className="font-medium">{posts.length}</p>
                <p className="text-13 font-normal text-gray-500">bài viết</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="font-medium">{user.is_followed_by_ids.length}</p>
                <p className="text-13 font-normal text-gray-500">
                  người theo dõi
                </p>
              </div>
              <div className="w-1/3 text-center">
                <div className="text-13 font-normal text-gray-500">
                  Đang theo dõi
                  <p />
                  <p className="font-medium">{user.following_ids.length}</p>
                  <p className="text-13 font-normal text-gray-500">
                    {" "}
                    người dùng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="md:mt-10">
        <ul className="grid grid-cols-3 gap-1 md:gap-5 lg:gap-7">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <PostGridItem
                key={post._id}
                post={post}
                setCurrentPostId={(id) => setCurrentPostId(id)}
              />
            ))}
        </ul>
      </section>

      {currentPostId && (
        <section className="fixed top-0 right-0 left-0 bottom-0  z-1000 px-40 py-10 flex items-center justify-center">
          <div
            onClick={() => {
              setCurrentPostId(null)
            }}
            className="absolute z-2 top-0 right-0 left-0 bottom-0 bg-black85"
          ></div>
          <div className="absolute z-10">
            {isLoading ? (
              <div className="max-w-936 max-h-600 my-auto flex">
                <ImageLoader />
                <ImageLoader />
              </div>
            ) : (
              <PostDetailView
                type="userPage"
                post={post}
                loggedUser={loggedUser}
                comments={comments}
              />
            )}
          </div>
        </section>
      )}

      {/* Modal option avatar */}
      <div className={`modal ${isModalOpen ? "" : "hidden"}`}>
        <div
          onClick={() => {
            setModalOpen(false)
          }}
          className={`overlay`}
        ></div>
        <div className=" w-400 z-2 rounded-xl bg-white text-center">
          <p className="py-5 border-b border-borderColor text-lg font-medium">
            Thay đổi ảnh hiện tại
          </p>
          <div
            onClick={() => setModalOpen(false)}
            className="border-b border-borderColor"
          >
            <label
              htmlFor="fileButton"
              className="cursor-pointer text-sm py-4 w-full h-full block font-bold text-textBlue"
            >
              Tải ảnh lên
            </label>
          </div>
          <div
            onClick={() => {
              handleDeleteAvatar()
              setModalOpen(false)
            }}
            className="py-4 border-b border-borderColor cursor-pointer"
          >
            <button className="text-red-500 font-bold text-sm">
              Gỡ ảnh hiện tại
            </button>
          </div>
          <div
            onClick={() => {
              setModalOpen(false)
            }}
            className="py-4 cursor-pointer"
          >
            <button className="text-sm">Hủy</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserPage
