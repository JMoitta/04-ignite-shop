import { X } from "@phosphor-icons/react";
import { styled } from "..";

export const ContainerCarrinho = styled("div",{
  // display: "none",
  position: "absolute",
  padding: 48,
  top: 0,
  right: 0,
  width: 480,
  height: "100vh",

  transform: "translateX(110%)",
  opacity: 0,
  transition: "all 0.2s ease-in-out",
  
  display: "flex",
  gap: 32,
  flexFlow: "column nowrap",
  boxShadow: "-10px 0 16px 0 rgba(0, 0, 0, 0.18), -14px 0 20px 0 rgba(0, 0, 0, 0.22)",

  backgroundColor: "$gray800",

  "&.show": {
    transform: "translateX(0%)",
    opacity: 1,
  },

  h2: {
    marginTop: 24,

    fontSize: "$lg"
  },

  svg: {
    position: "absolute",
    color: "$gray300",
    top: 24,
    right: 24,
    cursor: "pointer" 
  },
  
  section: {
    display: "flex",
    flexGrow: 1,
    overflow: "auto",

    flexDirection: "column",
    gap: 24,
    
    "&::-webkit-scrollbar": {
      width: 10,
      backgroundColor: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: 5,
      backgroundColor: "$gray300",
    },
  }
})

export const ProductInCart = styled("div", {
  display: 'flex',
  flexDirection: "row",
  gap: 20,

  div: {
    display: "flex",
    flexDirection: "column",
    fontSize: "$md",
    lineHeight: 1.6,

    p: {
      color: "$gray300",
    },

    span: {
      small: {
        marginLeft: "0.5rem",
        color: "$gray300",
      }
    },
    button: {
      border: 0,
      backgroundColor: "transparent",
      width: "min-content",
      // position: "absolute",
      // bottom: 0,
      // left: 0,
      
      fontSize: "1rem",
      color: "$green500",

      "&:hover": {
        color: "$green300",
        cursor: "pointer"
      }
    }
  },

})

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 100,
  height: 100,
  background: '$productGradient',
  borderRadius: 8,
  padding: '0.25rem',

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  }
})

export const FooterInCart = styled("footer", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.6,

  div: {
    display: "flex",
    flexFlow: "row wrap",

    p: {
      width: "100%",
      flexGrow: 1
    },

    span: {
      float: "right"
    },
  },

  "p:nth-child(1) span": {
    fontSize: "$md",
  },

  "p:nth-child(2)": {
    fontSize: "$md",
    fontWeight: "bold"
  },
  
  "p:nth-child(2) span": {
    fontSize: "$xl",
    lineHeight: 1.4
  },

  button: {
    marginTop: 40,
    border: 0,
    borderRadius: 8,
    padding: "1.25rem",

    color: "$white",
    fontSize: "$md",
    background: "$green500",
  }
})