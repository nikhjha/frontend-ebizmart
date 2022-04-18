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

const QuoteCard = ({ quote, setQuotes }) => {
  const deleteQuery = async () => {
    const res = await getFetch().delete(`reviews/${quote._id}`);
    console.log(res);
    setQuotes((quotes) => [...quotes.filter((o) => o._id !== quote._id)]);
  };
  return (
    <>
      <Typography variant='h4'>Requested Quotes</Typography>
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
                        {`${quote.firstName} ${quote.lastName} `} */}
                      </Typography>
                      <Typography color='Black' display='flex-right'>
                        date
                        {/* {`${quote.created}`}{" "} */}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant='h5'>titile</Typography>
                  <Typography variant='body1' color='GrayText'>
                    description
                    {/* {`${quote.description}`} */}
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

export default function UserRecievedQuotes({ quotes, setQuotes }) {
  return (
    <div>
      {/* {quotes.map((quote, index) => (
        <QuoteCard key={`quote_${index}`} quote={quote} setQuotes={setQuotes} />
      ))} */}
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid>
          <QuoteCard />
        </Grid>
      </Container>
    </div>
  );
}
