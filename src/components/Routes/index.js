import Layout from "../Layout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Views/Home";
import Project from "../Views/Project";

export default function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/project/:id" component={Project}/>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}
