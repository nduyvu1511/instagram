import React, { useState } from "react"
import { heartFillIcon, multiImage } from "../../public/icon/icons"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { Link } from "react-router-dom"
import { FiMessageCircle } from "react-icons/fi"

const PostGridItem = ({ post, setCurrentPostId }) => {
  const [currentImageHover, setCurrentImageHover] = useState("")
  return (
    <li className="relative col-span-1 row-span-1 max-h-150 sm:max-h-52 md:max-h-64 lg:max-h-296 lg:min-h-296 overflow-hidden list-none">
      <div
        onMouseOver={() =>
          setCurrentImageHover && setCurrentImageHover(post._id)
        }
        className="relative h-full w-full"
      >
        {post?.images?.length > 1 && (
          <button className="absolute top-3 right-3">{multiImage()}</button>
        )}
        <Link
          to={`/post/${post._id}`}
          className="w-full h-full pointer-events-auto md:pointer-events-none"
        >
          <LazyLoadImage
            height="100%"
            src={post.images[0]} // use normal <img> attributes as props
            width="100%"
            effect="blur"
            alt="img"
          />
        </Link>
      </div>

      {/* modal */}
      {currentImageHover === post._id && (
        <div
          onClick={() => setCurrentPostId && setCurrentPostId(post._id)}
          onMouseLeave={() => setCurrentImageHover && setCurrentImageHover("")}
          className={`absolute top-0 right-0 left-0 bottom-0 hidden z-10 md:flex bg-black40 items-center justify-center cursor-pointer`}
        >
          <div className="text-white flex items-center">
            <p className="flex items-center mr-5 font-medium">
              {heartFillIcon(24, 24, "#ffffff")}{" "}
              <span className="ml-2">
                {post.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className="flex items-center">
              <FiMessageCircle className="text-25 fill-white" />
              <span className="ml-2">{post.comments || 0}</span>
            </p>
          </div>
        </div>
      )}
    </li>
  )
}

export default PostGridItem
