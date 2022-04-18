// material
import { alpha, styled } from "@mui/material/styles"
import { Card, Typography } from "@mui/material"
// utils
import { fShortenNumber } from "../utility/formatNumber"
// component
import Iconify from "../Iconify"

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "#005249",
  backgroundColor: "#C8FACD",
}))

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: "#007B55",
  backgroundImage: `linear-gradient(135deg, ${alpha("#007B55", 0)} 0%, ${alpha(
    "#007B55",
    0.24
  )} 100%)`,
}))

// ----------------------------------------------------------------------

const TOTAL = 714000

export default function WeeklySales() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon='ant-design:android-filled' width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant='h3'>{fShortenNumber(TOTAL)}</Typography>
      <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
        Weekly Sales
      </Typography>
    </RootStyle>
  )
}
