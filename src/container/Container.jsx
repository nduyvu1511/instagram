import React from "react"
import { useDispatch, useSelector } from "react-redux"
import PrivateRoute from "../routes/PrivateRoute"
import routes from "../routes/routes"
import { useEffect } from "react"
import { fetchLoggedUser } from "../features/userSlice"
import Header from "./../components/header/Header"
import { Switch } from "react-router"
import Footer from "./../components/footer/Footer"

const Container = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user.loggedUser)

  useEffect(() => {
    dispatch(fetchLoggedUser())
  }, [dispatch])

  return (
    <>
      <Header loggedUser={loggedUser} />
      <Switch>
        {routes.map((route) => (
          <PrivateRoute
            exact
            key={route.id}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
      {/* <Footer /> */}
    </>
  )
}

export default Container
