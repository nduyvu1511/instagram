import React from "react"
import { Redirect, Route } from "react-router"
import { getCookie } from "../utils/cookie"

const PrivateRoute = ({ component: Component, ...restOfProps }) => {
  const isAuth = getCookie("userId")
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
