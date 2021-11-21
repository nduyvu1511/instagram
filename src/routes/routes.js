import Home from "../pages/Home"
import People from "../pages/People"
import Search from "../pages/Search"
import User from "../pages/User"
import PostDetail from "../pages/PostDetail"
import CommentDetail from "../pages/CommentDetail"
import EditAccount from "../pages/EditAccount"
import Explore from "../pages/Explore"

const routes = [
  { id: 1, path: "/", component: Home },
  { id: 2, path: "/explore/people", component: People },
  { id: 3, path: "/explore/search", component: Search },
  { id: 4, path: "/user/:id", component: User },
  { id: 5, path: "/post/:postId/comments", component: CommentDetail },
  { id: 6, path: "/post/:postId", component: PostDetail },
  { id: 7, path: "/accounts/edit", component: EditAccount },
  { id: 8, path: "/explore", component: Explore },
  // { id: 9, path: "*", component: NotFound },
]

export default routes
