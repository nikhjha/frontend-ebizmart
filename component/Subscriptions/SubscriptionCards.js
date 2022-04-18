import React from 'react'
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { fCurrency } from "../utility/formatNumber"



const SubscriptionCards = ({ heading, subHeading, specialPrice, id, renew, md, discountprice,
  feature1, feature2, feature3, feature4, feature5
}) => {
  const globalStyle = {
    p: 2, my: 2, display: 'flex', flexDirection: "column", position: 'relative',
    textAlign: 'center', width: '285px', transition: "transform 0.3s ease-in",

    ":hover": {
      boxShadow: '0px 0px 1rem 0px #C0C0C0	',
      transform: "scale(1.05)",
    },
  }
  // 
  const before = md ? {
    "::before": {
      content: '"Best Value"',
      position: "absolute",
      color: "white",
      // top: -10,
      left: 0,
      height: "7%",
      padding: 1,
      width: "100%",
      alignContent: "center",
      background: "#FF69B4",
      transform: "translateY(-100%)"
    }
  } : {}

const before1= md ?
       {transform: "scale(1.09)",
       ":hover": {
      boxShadow: '0px 0px 1rem 0px #C0C0C0	',
        transform: "scale(1.12)",
      },}:{}


  const sx = { ...globalStyle, ...before,...before1 }

  return (
    <div>
      <Paper elevation={5} sx={sx}>

        <Typography variant='h6' component='' sx={{ textAlign: "center", color: "Highlight", my: 1, mt: 4, color: md ? "#FF69B4" : "red" }} >{heading}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{subHeading}</Typography>

        <Box sx={{ alignItems: "center", my: 3 }}>
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: "text.disabled",
              textDecoration: "line-through",
              mx: 1
            }}
          >
            {fCurrency(discountprice)}
          </Typography>

          <Button sx={{
            py: 2, color: 'white', backgroundColor: md ? "#FF69B4" : "red",
            ":hover": { backgroundColor: md ? "#FF69B4" : "red" }
          }}>save 70%</Button>
          <Typography variant='h3' fontSize="1.2em" component='div' fontWeight='900'>
            <CurrencyRupeeIcon />{specialPrice}.00<Typography variant='body2' component='span'>/mo</Typography></Typography>
        </Box>
        <Button variant="contained" fullWidth={true} maxwidth="100px" sx={{ py: 2.5, 
        backgroundColor: md ? "#FF69B4" : "red", m: 'auto',
        ":hover":{backgroundColor: md ? "#FF69B4" : "red"}
       }}>Add to cart</Button>
        <Typography sx={{ p: 2 }} variant='caption'>{renew}</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'flex-start' }}>
          <Typography variant='subtitle2' component='span' sx={{ mb: 1 }}><CheckTwoToneIcon color="success" fontSize='small' sx={{ mx: 1 }} />{feature1}</Typography>
          <Typography variant='subtitle2' component='span' sx={{ mb: 1 }}><CheckTwoToneIcon color="success" fontSize='small' sx={{ mx: 1 }} />{feature2}</Typography>
          <Typography variant='subtitle2' component='span' sx={{ mb: 1 }}><CheckTwoToneIcon color="success" fontSize='small' sx={{ mx: 1 }} /> {feature3}</Typography>
          <Typography variant='subtitle2' component='span' sx={{ mb: 1 }}><CheckTwoToneIcon color="success" fontSize='small' sx={{ mx: 1 }} />{feature4}</Typography>
          <Typography variant='subtitle2' component='span' sx={{ mb: 1 }}><CheckTwoToneIcon color="success" fontSize='small' sx={{ mx: 1 }} />{feature5}</Typography>
        </Box>
      </Paper>
    </div>
  )
}

export default SubscriptionCards