import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100"
  },
  
  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem"
  },
   
  a: {
    display: "block",
    marginTop: '5rem',
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    }
  }
})

export const ImageContainer = styled('div', {
  // width: "100%",
  // maxWidth: 130,
  // height: 145,
  // borderRadius: 8,
  padding: '0.25rem',
  marginTop: "4rem",

  display: "flex",
  flexFlow: "row nowrap",
  // alignItems: "center",
  // justifyContent: "center",

  figure: {
    // width: "100%",
    width: 105,
    height: 105,
    borderRadius: "50%",
    background: '$productGradient',
    
    transform: "scale(150%)",
    boxShadow: "0 0 60px rgba(0, 0, 0, .8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    objectFit: "cover"
  }

})