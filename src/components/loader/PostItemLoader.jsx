import React from "react"
import ContentLoader from "react-content-loader"

const PostItemLoader = (props) => (
  <ContentLoader
    width={"100%"}
    height={"100%"}
    viewBox="0 0 800 575"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect width="100%" height="100%" />
  </ContentLoader>
)

export default PostItemLoader
