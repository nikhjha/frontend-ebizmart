import React, { useState } from "react";

export const GlobalStateContext = React.createContext({});

export default function GlobalStateProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const value = {
    categories,
    setCategories,
  };
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}
