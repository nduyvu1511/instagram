import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Container from "./container/Container"
import CreatePost from "./components/modals/CreatePost"
import { Route } from "react-router"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/*" component={Container} />
      </Switch>
      <CreatePost />
    </Router>
  )
}

export default App
