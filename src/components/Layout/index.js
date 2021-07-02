import React from "react";
import Navbar from "./Navbar";
export default function index(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
