import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../MenuPopover";
//
import account from "../../_mocks_/account";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import { user as userConstant } from "../../constant/constant";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/vendor/dashboard",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "/vendor/web_profile",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "/vendor/setting",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { user, logout } = useContext(AuthContext);

  const logoutUser = async () => {
    if (user) {
      const res = await getFetch().post(
        user.role === userConstant.vendor
          ? "/vendors/logout"
          : user.role === userConstant.admin
          ? "/admin/logout"
          : "/users/logout"
      );
      logout();
      console.log(res);
      router.push(
        user.role === userConstant.vendor
          ? "/vendor/login"
          : user.role === userConstant.admin
          ? "/admin/login"
          : "/user/login"
      );
    }
  };
  const logoutUserAll = async () => {
    if (user) {
      const res = await getFetch().post(
        user.role === userConstant.vendor
          ? "/vendors/logout/all"
          : user.role === userConstant.admin
          ? "/admin/logout/all"
          : "/users/logout/all"
      );
      logout();
      console.log(res);
      router.push(
        user.role === userConstant.vendor
          ? "/vendor/login"
          : user.role === userConstant.admin
          ? "/admin/login"
          : "/user/login"
      );
    }
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              router.push(option.linkTo);
              handleClose();
            }}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />
            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ px: 2, py: 1, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </Box>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={logoutUserAll}
          >
            Logout All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
