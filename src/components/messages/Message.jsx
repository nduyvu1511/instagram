import React from "react"

const Message = ({ message }) => {
  return (
    <div className="p-3 fixed bottom-0 left-0 right-0 z-2000 text-sm bg-black flex items-center text-white font-light text-left md:text-center animate-fromBottom">
      {message}
    </div>
  )
}

export default Message
