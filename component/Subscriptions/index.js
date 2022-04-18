import React from 'react'
import AllSubscriptionCards from './AllSubscriptionCards';
import Box from "@mui/material/Box";
import { Typography ,Stack,Link,Paper,Card,Avatar, Button, Container} from '@mui/material';


const index = () => {
  return (
    <div>
      <Box
        sx={{
          padding: 3,
          borderRadius: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
            mb: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" color="#dc2626" component="span" sx={{my:2}}>
            Select Your Plan
          </Typography>
        </Box>
        <Container maxWidth='lg'>
      <AllSubscriptionCards/>
      </Container>
      </Box>
    </div>
  )
}

export default index