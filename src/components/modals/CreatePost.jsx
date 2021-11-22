import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchCreatePost, fetchDeleteImage } from "../../features/postSlice"
import "../../index.css"
import { imageUpload } from "./../../public/icon/icons"
import { emojiIcon } from "../../public/icon/icons"
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react"
import { IoCloseOutline } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { closeCreatePostModal } from "../../features/createPostSlice"

const CreatePost = () => {
  const dispatch = useDispatch()
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const isModalOpen = useSelector((state) => state.createPostModal.isOpen)

  const [isSelectedImage, setSelectedImage] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [isOpenEmoji, setOpenEmoji] = useState(false)
  const [isCancelCreatePost, setCancelCreatePost] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const emojiRef = useRef()
  const emojiToggleButton = useRef()

  const handleCreatePost = () => {
    if (!title || !imageUrl || !loggedUser?._id) return
    dispatch(
      fetchCreatePost({
        title,
        user_id: loggedUser._id,
        images: [`${process.env.REACT_APP_ROOT_API}${imageUrl}`],
        user_name: loggedUser.user_name,
        avatar: loggedUser.avatar,
      })
    )
    setTitle("")
    setImagePreviewUrl(null)
    setImageFile(null)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenEmoji &&
        emojiRef.current &&
        emojiToggleButton.current &&
        !emojiRef.current.contains(e.target) &&
        !emojiToggleButton.current.contains(e.target)
      ) {
        setOpenEmoji(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpenEmoji])

  const handleDeleteImage = () => {
    if (imageUrl) {
      const imageUrlFormat = imageUrl.split("images/")[1]
      dispatch(fetchDeleteImage(imageUrlFormat))
    }
    setSelectedImage && setSelectedImage(false)
    setImagePreviewUrl(null)
    dispatch(closeCreatePostModal())
    setImageFile(null)
    setImageUrl(null)
  }

  const getPreviewImage = (e) => {
    const file = e.target.files[0]
    const previewImageUrl = URL.createObjectURL(file)
    setImagePreviewUrl(previewImageUrl)
  }

  const handleSendImage = () => {
    const formData = new FormData()
    formData.append("imageName", imageFile)
    axios
      .post("http://localhost:8080/upload/image", formData)
      .then((res) => {
        setImageUrl(res.data.fileNameInServer)
      })
      .catch((err) => console.log(err))
    if (imageFile) {
      setSelectedImage(true)
      dispatch(closeCreatePostModal())
    }
  }

  return (
    <>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <>
          <section className={`modal ${isModalOpen ? "flex" : "hidden"}`}>
            {/* Overlay */}
            <div
              onClick={() => {
                dispatch(closeCreatePostModal())
                setImagePreviewUrl(null)
                setImageUrl(null)
                setImageFile(null)
              }}
              className={`overlay`}
            ></div>
            <div
              className={`absolute z-2 md:h-600 w-full h-full md:w-500 rounded-none bg-white md:rounded-2xl overflow-hidden`}
            >
              <div className="px-5 py-4 flex justify-between border-b border-borderColor">
                <button
                  onClick={() => {
                    dispatch(closeCreatePostModal())
                    setImagePreviewUrl(null)
                    setImageUrl(null)
                    setImageFile(null)
                  }}
                  className="block md:hidden"
                >
                  <IoMdClose className="text-2xl" />
                </button>
                <form
                  encType="multipart/form-data"
                  className="overflow-hidden"
                  placeholder="Chọn ảnh từ máy tính"
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    id="postFile"
                    onChange={(e) => {
                      setImageFile(e.target.files[0])
                      getPreviewImage(e)
                    }}
                  />
                  <label
                    className="btn bg-transparent text-textBlue md:text-white md:bg-textBlue"
                    htmlFor="postFile"
                  >
                    Chọn Ảnh
                  </label>
                </form>
                {imageFile ? (
                  <button
                    onClick={handleSendImage}
                    className="text-textBlue w-8 text-15 font-medium md:ml-5"
                  >
                    Tiếp
                  </button>
                ) : (
                  <div className="w-8"></div>
                )}
              </div>
              <div className="w-full h-full">
                {imagePreviewUrl ? (
                  <img
                    className="w-full h-full block mx-auto object-cover"
                    src={imagePreviewUrl}
                    alt=""
                  />
                ) : (
                  <label htmlFor="postFile" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-10/12 w-full">
                      {imageUpload()}
                      <p className="mt-3">Chọn ảnh để hiển thị</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </section>

          {/* Post Image */}
          <section
            className={`modal animate-none ${
              isSelectedImage ? "flex" : "hidden"
            }`}
          >
            <div
              onClick={() => setCancelCreatePost(true)}
              className={`overlay`}
            ></div>
            <div
              className={`absolute z-2 w-full h-full md:h-600 md:w-880 bg-white md:rounded-2xl overflow-hidden transition-all duration-1000 ${
                isSelectedImage ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="py-3 border-b border-borderColor flex items-center justify-between px-6">
                <button
                  onClick={() => setCancelCreatePost(true)}
                  className="block md:hidden"
                >
                  <IoCloseOutline className="text-3xl" />
                </button>
                <h3 className="font-medium">Tạo bài viết mới</h3>
                <button
                  onClick={() => {
                    handleCreatePost()
                    setSelectedImage(false)
                  }}
                  className={`text-sm font-medium ${
                    title
                      ? "text-textBlue pointer-events-auto"
                      : "text-textBlue2 pointer-events-none"
                  }`}
                >
                  Chia sẻ
                </button>
              </div>
              <div className="flex flex-col-reverse md:flex-row md:h-full">
                <div className="w-full md:w-3/5">
                  <img
                    className="w-full h-full object-cover"
                    src={imagePreviewUrl}
                    alt=""
                  />
                </div>
                <div className="w-full md:w-2/5 border-l mb-10 md:mb-0 md:h-full px-4 relative">
                  <div className="my-3 flex items-center">
                    <img
                      src={loggedUser.avatar}
                      className="w-8 h-8 rounded-full object-cover"
                      alt=""
                    />
                    <p className="ml-3 font-medium text-sm">
                      {loggedUser.name}
                    </p>
                  </div>
                  <div className="relative">
                    <textarea
                      value={title}
                      maxLength={2000}
                      onChange={(e) =>
                        title.length <= 2000 && setTitle(e.target.value)
                      }
                      className="w-full outline-none mt-2 h-10 md:h-auto"
                      name=""
                      placeholder="Viết chú thích..."
                      cols="30"
                      rows="7"
                    ></textarea>
                    <div className="flex items-center justify-between absolute -bottom-6 w-full">
                      <button
                        ref={emojiToggleButton}
                        className="cursor-pointer"
                        onClick={() => setOpenEmoji(!isOpenEmoji)}
                      >
                        {emojiIcon(24, 24)}
                      </button>
                      <p className="text-xs font-normal text-gray-500 ">
                        {title.length}/2000
                      </p>
                    </div>
                  </div>

                  {isOpenEmoji && (
                    <div
                      ref={emojiRef}
                      className="absolute -top-7 md:bottom-14 h-64 overflow-hidden left-0"
                    >
                      <Picker
                        disableAutoFocus={true}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                        groupNames={{ smileys_people: "PEOPLE" }}
                        native
                        onEmojiClick={(e, emojiObject) => {
                          e.preventDefault()
                          setTitle(title + emojiObject.emoji)
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section
            className={`modal z-2000 ${isCancelCreatePost ? "" : "hidden"}`}
          >
            <div className="overlay"></div>
            <div className="z-2 bg-white rounded-2xl w-400">
              <div className="text-center pt-8 pb-6">
                <h3 className="text-base font-medium">Bỏ bài viết?</h3>
                <p className="text-sm text-gray-500 font-normal mt-3">
                  Nếu rời đi, Bạn sẽ mất những gì vừa tạo
                </p>
              </div>
              <div
                onClick={() => {
                  handleDeleteImage()
                  setCancelCreatePost(false)
                }}
                className="py-4 border-t text-sm font-bold text-red-500 text-center cursor-pointer"
              >
                Bỏ
              </div>
              <div
                onClick={() => setCancelCreatePost(false)}
                className="py-4 border-t text-sm text-center cursor-pointer"
              >
                Hủy
              </div>
            </div>
          </section>
        </>
      )}
      {/* Choose Image */}
    </>
  )
}

export default CreatePost
