import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { user as userConst } from "../constant/constant";

const useProtectedRoute = (role) => {
  const [verified, setVerified] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      let url;
      if (role === userConst.vendor) {
        url = "/vendor/login";
      } else if (role === userConst.admin) {
        url = "/admin/login";
      } else if (role === userConst.users) {
        url = "/user/login";
      }
      router.push(url);
    };
    if (user === null) {
      redirect();
      return;
    }
    if (!role || !user) {
      return;
    }
    if (user.role === role) {
      setVerified(true);
      return;
    }
    redirect();
  }, [user, router, role]);

  return verified;
};

export default useProtectedRoute;
