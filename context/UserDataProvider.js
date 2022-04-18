import React, { useState, useEffect, useContext } from "react";
import getFetch from "../libs/axiosClient";
import { AuthContext } from "./AuthProvider";
import { user as userConst } from "../constant/constant";
import { useRouter } from "next/router";

export const UserDataContext = React.createContext({});

export default function UserDataProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      let url;
      if (user.role === userConst.vendor) {
        url = `vendors/${user.id}`;
      } else if (user.role === userConst.admin) {
        url = `admin/${user.id}`;
      } else if (user.role === userConst.users) {
        url = `users/${user.id}`;
      } else {
        return;
      }
      try {
        const res = await getFetch().get(url);
        console.log(res);
        if (user.role === userConst.vendor) {
          setData(res.data.vendor);
        } else if (user.role === userConst.admin) {
          setData(res.data.vendor);
        } else if (user.role === userConst.users) {
          setData(res.data.user);
        }
        setDataLoading(false);
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          let url;
          if (user.role === userConst.vendor) {
            url = "/vendor/login";
          } else if (user.role === userConst.admin) {
            url = "/admin/login";
          } else if (user.role === userConst.users) {
            url = "/user/login";
          }
          router.push(url);
        }
        setDataLoading(false);
      }
    };
    if (user?.id) {
      setDataLoading(true);
      fetch();
    }
  }, [user, router]);

  const reloadData = async () => {
    setDataLoading(true);
    const url = `vendors/${user.id}`;
    try {
      const res = await getFetch().get(url);
      setData(res.data.vendor);
      setDataLoading(false);
    } catch (e) {
      console.log(e);
      setDataLoading(false);
    }
  };

  const value = {
    data,
    dataLoading,
    reloadData,
  };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
