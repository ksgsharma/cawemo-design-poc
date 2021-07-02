import React, { useState, useMemo } from "react";
import MyContext from "./MyContext";

export default function MyProvider(props) {
  const [mstate, setMstate] = useState({
    rename: false,
    projects: [],
    addFile: false,
  });
  const providers = useMemo(() => ({ mstate, setMstate }), [mstate, setMstate]);
  return (
    <MyContext.Provider value={providers}>{props.children}</MyContext.Provider>
  );
}
