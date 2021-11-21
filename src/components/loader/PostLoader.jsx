import React from "react"
import ContentLoader from "react-content-loader"

const PostLoader = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={460}
    viewBox="0 0 600 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="31" cy="31" r="15" />
    <rect x="58" y="18" rx="2" ry="2" width="600" height="23" />
    <rect
      x="0"
      y="60"
      rx="2"
      ry="2"
      width="600"
      height={props["type"] === "postItem" ? 600 : 400}
    />
  </ContentLoader>
)

export default PostLoader
