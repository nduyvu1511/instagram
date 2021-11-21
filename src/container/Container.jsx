import React from "react"
import { useDispatch, useSelector } from "react-redux"
import PrivateRoute from "../routes/PrivateRoute"
import routes from "../routes/routes"
import { useEffect } from "react"
import { fetchLoggedUser } from "../features/userSlice"
import Header from "./../components/header/Header"

const Container = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user.loggedUser)

  useEffect(() => {
    dispatch(fetchLoggedUser())
  }, [dispatch])

  return (
    <>
      <Header loggedUser={loggedUser} />
      {routes.map((route) => (
        <PrivateRoute
          key={route.id}
          path={route.path}
          exact
          component={route.component}
        />
      ))}
    </>
  )
}

export default Container
