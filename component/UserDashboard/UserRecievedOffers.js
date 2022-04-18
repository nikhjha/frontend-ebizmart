import React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import getFetch from "../../libs/axiosClient";

const OfferCard = ({ offer, setOffers }) => {
  const deleteQuery = async () => {
    const res = await getFetch().delete(`reviews/${offer._id}`);
    console.log(res);
    setOffers((offers) => [...offers.filter((o) => o._id !== offer._id)]);
  };
  return (
    <>
      <Typography variant='h4'>Recieved Offers</Typography>
      <Box sx={{ pt: "3rem" }}>
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
                  src=''
                  sx={{ width: 70, height: 70 }}
                  //alt={`${query.user.name} `}
                ></Avatar>
              </Grid>
              <Grid item xs={7}>
                <Stack spacing={1} sx={{ pt: "1rem" }}>
                  <Stack>
                    <Box
                      display='flex'
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography color='Red' varient='h3' display='flex-left'>
                        firstname
                        {/* {" "}
                        {`${offer.firstName} ${offer.lastName} `} */}
                      </Typography>
                      <Typography color='Black' display='flex-right'>
                        date
                        {/* {`${offer.created}`}{" "} */}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant='h5'>titile</Typography>
                  <Typography variant='body1' color='GrayText'>
                    description
                    {/* {`${offer.description}`} */}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={1} sx={{ pr: "1rem", pt: "1rem" }}>
                  <Button onClick={deleteQuery}>
                    <DeleteOutlinedIcon color='primary' fontSize='medium' />
                  </Button>
                  <Button>
                    <ReplyAllOutlinedIcon color='primary' fontSize='medium' />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default function UserRecievedOffers({ offers, setOffers }) {
  return (
    <div>
      {/* {offers.map((offer, index) => (
        <OfferCard key={`offer_${index}`} offer={offer} setOffers={setOffers} />
      ))} */}
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid>
          <OfferCard />
        </Grid>
      </Container>
    </div>
  );
}
