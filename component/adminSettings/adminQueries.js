import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import getFetch from "../../libs/axiosClient";
import ConfirmModel from "../utility/ConfirmModal";

const QueryCard = ({ query, setQueries }) => {
  const deleteQuery = async () => {
    const res = await getFetch().delete(`reviews/${query._id}`);
    console.log(res);
    setQueries((queries) => [...queries.filter((q) => q._id !== query._id)]);
  };
  console.log(query);
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ pb: "2rem" }}>
      <Card
        sx={{
          pb: "1rem",
          pt: "1rem",
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
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={query.user.icon}
                sx={{ width: 70, height: 70 }}
                alt={`${query.user.name} `}
              ></Avatar>
            </Grid>
            <Grid item xs={7}>
              <Stack spacing={1} sx={{ pt: "1rem" }}>
                <Stack>
                  <Box display="flex" sx={{ justifyContent: "space-between" }}>
                    <Typography color="Red" varient="h3" display="flex-left">
                      {" "}
                      {`${query.firstName} ${query.lastName} `}
                    </Typography>
                    <Typography color="Black" display="flex-right">
                      {" "}
                      {`${query.created}`}{" "}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="h5">{`${query.title} `}</Typography>
                <Typography variant="body1" color="GrayText">
                  {query.description}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack spacing={1} sx={{ pr: "1rem", pt: "1rem" }}>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <DeleteOutlinedIcon color="primary" fontSize="medium" />
                </Button>
                <Button>
                  <ReplyAllOutlinedIcon color="primary" fontSize="medium" />
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmModel
        open={open}
        setOpen={setOpen}
        title={`Delete Query`}
        content="You are about to delete a query. Are you sure about it ?"
        onConfirm={deleteQuery}
      />
    </Box>
  );
};

export default function AdminQuery({ queries, setQueries }) {
  return (
    <>
      <div>
        <Grid>
          {queries.map((query, index) => (
            <QueryCard
              key={`query_${index}`}
              query={query}
              setQueries={setQueries}
            />
          ))}
        </Grid>
      </div>
    </>
  );
}
