import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo";
import {
  Box,
  Button,
  Menu,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  MenuItem,
  Stack,
  Drawer,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { MHidden } from "../@material-extend";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import { user as userConst } from "../../constant/constant";
import { UserDataContext } from "../../context/UserDataProvider";
import Image from "next/image";
import { convertToSlug } from "../utility/slug";
import { baseURL } from "../../libs/axiosClient";

export default function Topbar() {
  return (
    <>
      <Header />
    </>
  );
}

const locations = [
  {
    name: "Mumbai",
    image: "/mumbai2.svg",
    value: "Mumbai",
  },
  {
    name: "Pune",
    image: "/Pune.svg",
    value: "Pune",
  },
  {
    name: "Delhi",
    image: "/Delhi2.svg",
    value: "Delhi",
  },
  {
    name: "Jaipur",
    image: "/Jaipur.svg",
    value: "Jaipur",
  },
  {
    name: "Kolkata",
    image: "/Kolkata.svg",
    value: "Kolkata",
  },
  {
    name: "Lucknow",
    image: "/Lucknow.svg",
    value: "Lucknow",
  },
  {
    name: "Surat",
    image: "/surat.svg",
    value: "Surat",
  },
  {
    name: "Agra",
    image: "/Agra.svg",
    value: "Agra",
  },
  {
    name: "Bengaluru",
    image: "/Bengaluru.svg",
    value: "Bengaluru",
  },
  {
    name: "Chennai",
    image: "/chennai.svg",
    value: "Channai",
  },
  {
    name: "Hyderabad",
    image: "/Hyderabad.svg",
    value: "Hyderabad",
  },
  {
    name: "Ahmedabad",
    image: "/ahmedabad.svg",
    value: "Ahmedabad",
  },
];

const LocationSelector = ({ sx }) => {
  const [value, setValue] = useState("Pune");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={sx}>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {value}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box sx={{ width: 500, p: 3 }}>
          <TextField
            label="Search by City"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationSearchingIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={2}>
            {locations.map(({ name, image }, ind) => (
              <Grid key={`location-card_${ind}`} item md={3}>
                <Card
                  onClick={() => {
                    setValue(name);
                    handleClose();
                  }}
                  sx={{
                    cursor: "pointer",
                    pt: 1,
                    ":hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    sx={{ px: 2 }}
                    height={50}
                    image={image}
                    alt={name}
                    component="img"
                  />
                  <CardContent
                    sx={{ p: 0, textAlign: "center", ":last-child": { py: 1 } }}
                  >
                    <Typography>{name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Menu>
    </Box>
  );
};

const SearchInput = styled("input")({
  border: 0,
  outline: "none",
  fontSize: "0.8rem",
  color: "GrayText",
  marginLeft: "0.5rem",
  flexGrow: 1,
});

const SearchBar = ({ sx }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { categories } = useContext(GlobalStateContext);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searchResult, setSearchResult] = useState({
    products: [],
    vendors: [],
  });
  useEffect(() => {
    if (value !== "") {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [value]);
  const handleSubmit = () => {
    router.push(`/search?q=${value}`);
    handleClose();
    setFocused(false);
  };
  return (
    <Box sx={sx}>
      <Box
        sx={{
          borderRadius: "1.75rem",
          boxShadow: 4,
          p: 0.8,
          px: 1.25,
          minWidth: "100%",
          position: "relative",
        }}
        component={motion.div}
        animate={{
          borderBottomRightRadius: focused ? "0rem" : "1.75rem",
          borderBottomLeftRadius: focused ? "0rem" : "1.75rem",
        }}
        onBlur={() => {
          setFocused(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            minWidth: "100%",
          }}
        >
          <MHidden width="lgDown">
            <Box>
              <Button
                variant="outlined"
                endIcon={<ArrowDropDownIcon />}
                onClick={(e) => {
                  if (open) {
                    handleClose();
                  } else {
                    handleClick(e);
                  }
                }}
                sx={{
                  width: "25ch",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                component={motion.button}
                animate={{
                  borderBottomRightRadius: open ? "0rem" : "1.2rem",
                  borderBottomLeftRadius: open ? "0rem" : "1.2rem",
                }}
              >
                {categoryValue !== "" ? categoryValue : "All Categories"}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 0,
                    width: "18ch",
                    height: 400,
                    borderBottomRightRadius: "1.2rem",
                    borderBottomLeftRadius: "1.2rem",
                  },
                }}
              >
                <MenuItem
                  selected={categoryValue === ""}
                  onClick={() => {
                    setCategoryValue("");
                    handleClose();
                  }}
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                  }}
                >
                  All Categories
                </MenuItem>
                {categories.map((category, index) => (
                  <MenuItem
                    key={`category_${index}`}
                    selected={category.name === categoryValue}
                    onClick={() => {
                      setCategoryValue(category.name);
                      handleClose();
                    }}
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      fontSize: "0.8rem",
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </MHidden>
          <SearchInput
            type="text"
            placeholder="Search.."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <SearchIcon
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "50%",
              p: 0.75,
              fontSize: "2rem",
              cursor: "pointer",
            }}
            component={motion.svg}
            whileTap={{ scale: 0.8 }}
            onClick={handleSubmit}
          />
        </Box>
        {focused && (
          <Box
            sx={{
              width: "100%",
              maxHeight: "400px",
              p: 2,
              position: "absolute",
              bottom: 0,
              left: 0,
              boxShadow: 4,
              backgroundColor: "white",
              transform: "translateY(100%)",
              zIndex: "500",
              borderBottomRightRadius: "1.75rem",
              borderBottomLeftRadius: "1.75rem",
            }}
          >
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Products
            </Typography>
            {searchResult.products.length === 0 && (
              <Typography variant="body2" color="GrayText" gutterBottom>
                No Product Found
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Vendors
            </Typography>
            {searchResult.vendors.length === 0 && (
              <Typography variant="body2" color="GrayText" gutterBottom>
                No Vendor Found
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Categories
            </Typography>
            {searchResult.vendors.length === 0 && (
              <Typography variant="body2" color="GrayText" gutterBottom>
                No Category Found
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const LocationDrawer = ({ city, setCity, openDrawer }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        onClick={() => {
          router.push("/");
        }}
      >
        <Logo />
      </Box>
      <Stack sx={{ mt: 2 }} spacing={1}>
        {locations.map((location, index) => (
          <Button
            key={`location_btn_${index}`}
            variant={location.value === city ? "contained" : "text"}
            onClick={() => {
              setCity(location.value);
              openDrawer(-1);
            }}
          >
            {location.value}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

const CustomButton = ({ children, StartIcon, to, setOpen, ...props }) => {
  const router = useRouter();
  return (
    <Button
      sx={{
        color: "GrayText",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        ":hover": { color: "primary.main" },
      }}
      onClick={() => {
        router.push(to);
        setOpen(false);
      }}
    >
      <Image
        src={`${baseURL}/${StartIcon}`}
        width={20}
        height={20}
        alt={"" + children}
      />
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
const CategoriesDrawer = ({ setOpen }) => {
  const { categories } = useContext(GlobalStateContext);
  return (
    <Box sx={{ p: 2 }}>
      <Box
        onClick={() => {
          router.push("/");
        }}
      >
        <Logo />
      </Box>
      <Stack sx={{ mt: 2 }} spacing={1}>
        {categories.map((category, ind) => {
          return (
            <CustomButton
              key={`category_btn_${ind}`}
              StartIcon={category.logo}
              to={"/category/" + convertToSlug(category.name)}
              setOpen={setOpen}
            >
              {category.name}
            </CustomButton>
          );
        })}
      </Stack>
    </Box>
  );
};

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { user } = useContext(AuthContext);
  const { data } = useContext(UserDataContext);
  const [city, setCity] = useState(locations[1].value);
  const [drawerNo, openDrawer] = useState(-1);

  return (
    <Box>
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <MHidden width="mdUp">
          <MenuIcon
            sx={{ cursor: "pointer", mx: 2, color: "primary.main" }}
            onClick={() => {
              setOpen(true);
            }}
          />
        </MHidden>
        <Box
          sx={{ marginLeft: isMd ? "0rem" : "auto", cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Logo />
        </Box>
        <MHidden width="mdDown">
          <LocationSelector sx={{ mx: 2 }} />
        </MHidden>
        <MHidden width="mdDown">
          <SearchBar sx={{ margin: "0 auto", width: "50rem" }} />
          <Button sx={{ mx: 1 }}>Help</Button>
          <Button
            onClick={() => {
              if (
                user &&
                user.role === userConst.users &&
                data &&
                data.firstName
              ) {
                router.push("/user/account");
                return;
              }
              router.push("/user/login");
            }}
            sx={{ mx: 1, width: 155 }}
            variant="contained"
            onMouseEnter={() => {
              setLoginHover(true);
            }}
            onMouseLeave={() => {
              setLoginHover(false);
            }}
            component={motion.button}
            animate={loginHover ? { scale: 1.2 } : { scale: 1 }}
            endIcon={
              <ArrowForwardIcon
                component={motion.svg}
                sx={loginHover ? {} : { width: 0 }}
                animate={
                  loginHover
                    ? { x: "0", opacity: 1 }
                    : { x: "-100%", opacity: 0 }
                }
              />
            }
          >
            {user && user.role === userConst.users && data && data.firstName
              ? `Hello ${data.firstName}`
              : "Log in/ Sign in"}
          </Button>
        </MHidden>
      </Box>
      <MHidden width="mdUp">
        <Box
          sx={{
            p: 2,
            pt: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar sx={{ width: "100%", minWidth: "10rem" }} />
        </Box>
      </MHidden>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {drawerNo === -1 && (
          <Box sx={{ p: 2 }}>
            <Box
              onClick={() => {
                router.push("/");
              }}
            >
              <Logo />
            </Box>
            <Stack sx={{ mt: 2 }} spacing={1}>
              <Button
                fullWidth
                sx={{ justifyContent: "start" }}
                onClick={() => {
                  if (
                    user &&
                    user.role === userConst.users &&
                    data &&
                    data.firstName
                  ) {
                    router.push("/user/account");
                    return;
                  }
                  router.push("/user/login");
                }}
              >
                {user && user.role === userConst.users && data && data.firstName
                  ? `Hello ${data.firstName}`
                  : "Log in/ Sign in"}
              </Button>
              <Button
                fullWidth
                endIcon={<ArrowRightIcon />}
                sx={{ justifyContent: "space-between" }}
                onClick={() => {
                  openDrawer(0);
                }}
              >
                {city}
              </Button>
              <Button
                fullWidth
                endIcon={<ArrowRightIcon />}
                sx={{ justifyContent: "space-between" }}
                onClick={() => {
                  openDrawer(1);
                }}
              >
                Categories
              </Button>
            </Stack>
          </Box>
        )}
        {drawerNo === 0 && (
          <LocationDrawer
            city={city}
            setCity={setCity}
            openDrawer={openDrawer}
          />
        )}
        {drawerNo === 1 && <CategoriesDrawer setOpen={setOpen} />}
      </Drawer>
    </Box>
  );
};
