import React from "react";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/GlobalStateProvider";

function SetToGlobalState({ categories }) {
  const { setCategories } = useContext(GlobalStateContext);
  useEffect(() => {
    setCategories(categories.map((category) => category.category));
  }, [categories]);
  return <div></div>;
}

export default SetToGlobalState;
