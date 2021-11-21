import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Container from "./container/Container"
import CreatePost from "./components/modals/CreatePost"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/*" component={Container} />
      </Switch>
      <CreatePost />
    </Router>
  )
}

export default App
