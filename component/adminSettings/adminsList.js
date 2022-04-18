import {
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/CategoryPanel.module.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import ConfirmModal from "../utility/ConfirmModal";

const AdminCard = ({ FirstName, LastName, email, Phone }) => {
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false);
  return (
    <Box>
      <div className={styles.Admin_cart_card_content}>
        <Card
          sx={{
            cursor: "pointer",
            position: "relative",
            ":hover": {
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "0.5rem solid pink",
              },
            },
          }}
        >
          <CardContent>
            <Grid
              item
              container
              spacing={2}
              sx={{ pt: "1.5rem", pb: "1rem", pl: "2rem" }}
            >
              <Grid xs={10} item>
                <Typography align="left" variant="h4" width={"75%"}>
                  {FirstName} {LastName}
                </Typography>
                <Typography
                  align="left"
                  variant="h6"
                  width={"75%"}
                  pl="0rem"
                  pt="0.5rem"
                  fontWeight="light"
                >
                  {Phone}
                </Typography>
                <Typography
                  align="left"
                  variant="h6"
                  width={"75%"}
                  pl="0rem"
                  fontWeight="light"
                >
                  {email}
                </Typography>
              </Grid>
              <Grid xs={2} item>
                <Box sx={{ pt: "1.5rem" }}>
                  <Button
                    onClick={() => {
                      setOpenDeleteAdmin(true);
                    }}
                  >
                    <DeleteOutlinedIcon color="primary" fontSize="large" />
                  </Button>
                  <ConfirmModal
                    open={openDeleteAdmin}
                    setOpen={setOpenDeleteAdmin}
                    title={"Delete Admin"}
                    content="You are about to delete an admin. Are you sure about it?"
                    onConfirm={() => {
                      console.log("implement delete admin");
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default function Adminlist() {
  const [adminList, setAdminList] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFetch().get("/admin");
      console.log(res);
      setAdminList(res.data.data.admin);
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <div className={styles.Admin_cart}>
      <Grid>
        {adminList.map((admin, index) => (
          <Grid key={`Admin_cart_card_${index}`}>
            <div className={styles.Admin_cart_card}>
              <AdminCard
                FirstName={admin.first_name}
                LastName={admin.last_name}
                email={admin.email}
                Phone={admin.phone}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
