import React from "react"
import ContentLoader from "react-content-loader"

const ImageLoader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 600 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect width="100%" height="600px" />
    </ContentLoader>
  )
}

export default ImageLoader
