import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import GoogleLogin from "react-google-login";
import { vendorLogin, vendorRegistration } from "../../constant/constant";
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import { Button } from "@mui/material";
import getFetch from "../../libs/axiosClient";

export default function GoogleBtn({ action, setError }) {
  const { addToken, addUser } = useContext(AuthContext);
  const clientFetch = getFetch();
  const router = useRouter();

  const postVendorRegister = async () => {
    try {
      const res = await clientFetch.post("/vendors/googleRegister");
      addUser({ id: res.data.id });
      router.push("/vendor/details");
      console.log(res.status);
    } catch (e) {
      console.log(e);
      console.log(e?.response);
      setError(e?.response?.data?.message);
    }
  };
  const postVendorLogin = async () => {
    try {
      const res = await clientFetch.post("/vendors/googleLogin");
      addUser({ id: res.data.id });
      router.push("/vendor/details");
    } catch (e) {
      console.log(e);
      console.log(e?.response);
      setError(e?.response?.data?.message);
    }
  };
  const handleSuccess = (response) => {
    console.log(response);
    const token = response?.tokenId;
    addToken(token);
    switch (action) {
      case vendorLogin:
        postVendorLogin();
        addUser({});
        break;
      case vendorRegistration:
        postVendorRegister();
        break;
      default:
        break;
    }
  };
  const handleFailure = (response) => {
    console.log(response);
    setError("Please check your net connection.");
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>
      )}
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}
