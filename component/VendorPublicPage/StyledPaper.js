import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)({
  width: "100%",
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
    borderRadius: "1.2rem",
    backgroundColor: "rgba(220,50,38,0.2)",
    boxShadow: "0px 0px 1rem 0px black",
    zIndex: "-10",
  },
});

export default StyledPaper