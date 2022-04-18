import React, { useState, useEffect } from "react";
import { profile } from "../constant/constant";
import { createTokenizedFetch, setNormalFetch } from "../libs/axiosClient";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(profile));
    if (localData?.token) {
      createTokenizedFetch(localData.token);
      const decoded = jwt_decode(localData.token);
      setUser({ ...localData, ...decoded });
      console.log(decoded);
    } else {
      setUser(null);
    }
  }, []);

  const addUser = (data) => {
    const localData = JSON.parse(localStorage.getItem(profile));
    localStorage.setItem(profile, JSON.stringify({ ...localData, ...data }));
    setUser(data);
  };
  const addToken = (token) => {
    localStorage.setItem(profile, JSON.stringify({ token }));
    setUser({});
    createTokenizedFetch(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(profile);
    setNormalFetch();
  };

  const value = {
    user,
    addUser,
    addToken,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
