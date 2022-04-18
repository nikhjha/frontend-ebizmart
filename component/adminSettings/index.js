import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Paper,
  Button,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material";
import AdminProfile from "./adminProfile";
import Admins from "./adminsList";
import AddAdmin from "./addAdmin";
import AdminQueries from "./adminQueries";
import QueriesSort from "./queriesSort";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user as userConst } from "../../constant/constant";

const StyledPaper = styled(Paper)({
  position: "relative",
  backgroundColor: "white",
  ":before": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "calc( 100% + 1.2rem)",
    height: "calc( 100% + 1.2rem)",
    transform: "translate( -50%, -50%)",
    borderRadius: "0.5rem",
    backgroundColor: "rgba(220,50,38,0.2)",
    boxShadow: "0px 0px 1rem 0px black",
    zIndex: "-10",
  },
});

const AdminSettings = () => {
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [queries, setQueries] = useState([]);
  const { user } = useContext(AuthContext);
  const verified = useProtectedRoute(userConst.admin);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getFetch().get("/reviews/queries");
        setQueries(
          res.data.data.Queries.map((review) => {
            return {
              ...review,
              user: {},
              created: review.dateCreated.split("T")[0],
            };
          })
        );
      } catch (e) {
        console.log(e.response);
      }
    };
    if (user) {
      fetch();
    }
  }, [user]);
  return (
    <Box>
      {verified && (
        <Container>
          {/* <StyledPaper elevation={6} sx={{ my: 2, p: 2, height: "100%" }} component="form" id="images/reviews"> */}
          <Box sx={{ pl: "8.8rem", pb: "2rem" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="Vendor's details"
            >
              <Tab
                sx={{ pl: "5rem", pr: "5rem" }}
                value="one"
                label="Profile"
              />
              <Tab sx={{ pl: "5rem", pr: "5rem" }} value="two" label="Admins" />
              <Tab
                sx={{ pl: "5rem", pr: "5rem" }}
                value="three"
                label="Queries"
              />
              <Tab
                sx={{ pl: "5rem", pr: "5rem" }}
                value="four"
                label="Add Admin"
              />
            </Tabs>
          </Box>
          {value === "one" && (
            <Stack sx={{ p: 2, pt: 3 }} spacing={2}>
              <Typography variant="h4" sx={{ pl: 5 }}>
                Profile
              </Typography>
              <AdminProfile />
            </Stack>
          )}

          {value === "two" && (
            <Stack sx={{ p: 2, pt: 3 }} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Typography variant="h4">Admins</Typography>
                <Box sx={{ pr: "5rem" }}>
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                    }}
                  >
                    {" "}
                    Add Admin
                  </Button>
                </Box>
              </Box>
              <Box>
                <Admins />
              </Box>
            </Stack>
          )}

          {value === "three" && (
            <Stack sx={{ p: 2, pt: 3 }} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  lineHeight: "2.5rem",
                }}
              >
                <Typography variant="h4">Queries</Typography>
                <Box />
                <Box sx={{ pr: "2.5rem" }}>
                  <QueriesSort queries={queries} setQueries={setQueries} />
                </Box>
              </Box>
              <Box>
                <AdminQueries queries={queries} setQueries={setQueries} />
              </Box>
            </Stack>
          )}

          {value === "four" && (
            <Stack sx={{ p: 2, pt: 3 }} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Typography variant="h4" sx={{ pl: 5 }}>
                  Add Admin
                </Typography>
              </Box>
              <Box>
                <AddAdmin />
              </Box>
            </Stack>
          )}
          {/* </StyledPaper> */}
        </Container>
      )}
    </Box>
  );
};

export default AdminSettings;
