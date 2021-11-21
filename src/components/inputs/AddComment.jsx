import React, { useEffect, useRef, useState } from "react"
import { emojiIcon } from "../../public/icon/icons"
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react"
import { useDispatch, useSelector } from "react-redux"

import { fetchAddComment } from "./../../features/postSlice"

const AddComment = ({ postId, type }) => {
  
  const [isOpenEmoji, setOpenEmoji] = useState(false)
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const emojiRef = useRef()
  const buttonEmojiRef = useRef()

  const handleAddComment = (e) => {
    e.preventDefault()
    setOpenEmoji(false)
    if (text === "") return

    if (loggedUser?._id && postId) {
      dispatch(
        fetchAddComment({
          comment: {
            user_id: loggedUser._id,
            post_id: postId,
            title: text,
          },
          userId: loggedUser._id,
        })
      )
      setText("")
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenEmoji &&
        emojiRef.current &&
        buttonEmojiRef.current &&
        !buttonEmojiRef.current.contains(e.target) &&
        !emojiRef.current.contains(e.target)
      ) {
        setOpenEmoji(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpenEmoji])
  return (
    <form
      onSubmit={handleAddComment}
      className={`flex w-full relative ${
        type === "commentDetail"
          ? "py-2 rounded-3xl bg-white pl-2 pr-4 border border-borderColor"
          : ""
      }`}
    >
      <span
        className="cursor-pointer"
        ref={buttonEmojiRef}
        onClick={() => setOpenEmoji(!isOpenEmoji)}
      >
        {type !== "commentDetail" && emojiIcon(24, 24)}
      </span>
      {isOpenEmoji && type !== "commentDetail" && (
        <div ref={emojiRef} className="absolute -top-336 h-300 -left-5">
          <Picker
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
            onEmojiClick={(e, emojiObject) => {
              e.preventDefault()
              setText(text + emojiObject.emoji)
            }}
          />
        </div>
      )}
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="flex-1 mx-3 text-sm text-black outline-none"
        type="text"
        placeholder="Thêm bình luận..."
      />
      <button
        type="submit"
        className={`${
          text === ""
            ? "text-blue-300 cursor-auto pointer-events-none"
            : "text-textBlue cursor-pointer pointer-events-auto"
        }`}
      >
        Đăng
      </button>
    </form>
  )
}

export default AddComment
