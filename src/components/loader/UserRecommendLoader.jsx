import React from "react"
import ContentLoader from "react-content-loader"

const UserRecommendLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"50"}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="28" cy="30" r="18" />
    <rect x="56" y="13" rx="5" ry="5" width="100%" height="35" />
  </ContentLoader>
)

export default UserRecommendLoader
