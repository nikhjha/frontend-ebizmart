import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// components
import Logo from "../Logo";
import Scrollbar from "../Scrollbar";
import NavSection from "../NavSection";
import { MHidden } from "../@material-extend";
//
import sidebarConfig from "./SidebarConfig";
import adminSidebarConfig from "./AdminSidebarConfig";
import userSidebarConfig from "./UserSidebarConfig";
import account from "../../_mocks_/account";
import { useRouter } from "next/router";
import Image from "next/image";
import { user as userConstant } from "../../constant/constant";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
  user = userConstant.vendor,
}) {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box
          onClick={() => {
            push("/");
          }}
          sx={{ display: "inline-flex", cursor : "pointer" }}
        >
          <Logo />
        </Box>
        {user === userConstant.vendor && (
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main", ml: 2, fontSize: 12 }}
          >
            {userConstant.vendor}
          </Typography>
        )}
        {user === userConstant.admin && (
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main", ml: 2, fontSize: 12 }}
          >
            {userConstant.admin}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link
          underline="none"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={
          user === userConstant.admin
            ? adminSidebarConfig
            : sidebarConfig && user === userConstant.users
            ? userSidebarConfig
            : sidebarConfig
        }
      />

      <Box sx={{ flexGrow: 1 }} />

      {user === userConstant.vendor && (
        <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
          <Stack
            alignItems="center"
            spacing={3}
            sx={{
              p: 2.5,
              pt: 5,
              borderRadius: 2,
              position: "relative",
              bgcolor: "grey.200",
            }}
          >
            <Box sx={{ width: 100, position: "absolute", top: -50 }}>
              <Box sx={{ width: 100, position: "relative" }}>
                <Image
                  alt="illustration"
                  src="/illustrations/illustration_avatar.png"
                  width="100"
                  height="109"
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h6">
                Get more?
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                From only $69
              </Typography>
            </Box>

            <Button
              fullWidth
              href="https://material-ui.com/store/items/minimal-dashboard/"
              target="_blank"
              variant="contained"
            >
              Upgrade to Pro
            </Button>
          </Stack>
        </Box>
      )}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
