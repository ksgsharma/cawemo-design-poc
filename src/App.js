import React, { Component } from "react";
import MyProvider from "./components/Context/MyProvider";
import Routes from "./components/Routes/";
import './App.css'

export default class App extends Component {
  render() {
    return (
      <MyProvider>
        <Routes />
      </MyProvider>
    );
  }
}
