import React, { Component } from "react";
import MyContext from "./components/Context/MyContext";

export default class about extends Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {(context) => {
            console.log(context);
          }}
        </MyContext.Consumer>
      </div>
    );
  }
}
