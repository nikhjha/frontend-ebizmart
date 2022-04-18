import React from 'react'
import SubscriptionCards from './SubscriptionCards'
import { Grid } from "@mui/material";




const data=[{
    id:1,
    heading:"Bronze Pack",
    subHeading:"Ideal solution for beginners",
    discountprice:470,
    specialPrice:200.00,
    renew:'₹299.00/mo when you renew',
    feature1:"Beginner plan ",
    feature2:"Prime membership ",
    feature3:"Soft features",
    feature4:"Beginner ",
    feature5:"Beginner "
},
{
    id:2,
    heading:"Silver Pack",
    discountprice:660,
    subHeading:"Perfect package for personal websites",
    specialPrice:350.00,
    renew:'₹399.00/mo when you renew',
    feature1:"Best Plan ",
    feature2:"Special Features",
    feature3:"Incresases Your  popularity",
    feature4:"Best Experince",
    feature5:"Beginner "



},{
    id:3,
    heading:"Gold pack",
    subHeading:"Optimized for small and medium businesse",
    discountprice:770,
    specialPrice:400.00,
    renew:'₹499.00/mo when you renew',
    feature1:"Advance plan ",
    feature2:"Beginner plan ",
    feature3:"Beginner plan ",
    feature4:"Beginner plan ",
    feature5:"Beginner plan "

}
,{
    id:4,
    heading:"Platinum Pack",
    subHeading:"Optimized for small and medium businesse",
    discountprice:1200,
    specialPrice:1170.00,
    renew:'₹999.00/mo when you renew',
    feature1:"Advance plan ",
    feature2:"Beginner plan ",
    feature3:"Beginner plan ",
    feature4:"Beginner plan ",
    feature5:"Beginner plan "

}


]

const AllSubscriptionCards = () => {
  return (
    <div>
<Grid container spacing={14} >
      {data.map((e,index) => (
        <Grid key={e.id} item xs={12} sm={6} md={3} sx={{display:"flex" ,justifyContent:"center"}}>
           <SubscriptionCards {...e} md={Math.floor((data.length+1+2)/2) === index+1} />
        </Grid>
      ))}
    </Grid>
       
    </div>
  )
}

export default AllSubscriptionCards