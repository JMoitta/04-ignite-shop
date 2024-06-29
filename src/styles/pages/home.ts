import { styled } from "..";

export const HomeContainer = styled("main", {
  display: 'flex',
  // overflowY:"hidden",
  // gap: '3rem',
  width: "100%",
  maxWidth: 'calc(100vw - ((100vw - 1180px) /2))',
  marginLeft: 'auto',
  minHeight: 656
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    justifyContent: "space-between",

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    a: {
      position: "relative"
    },

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      fontSize: '$xl',
      fontWeight: 'bold',
      color: "$green300",
    },

  },

  'footer > button': {
    border: 0,
    borderRadius: 6,
    padding: '0.75rem',
    color: "$white",
    backgroundColor: "$green500",
    cursor: "pointer"
  },
  
  'footer > button:hover': {
    backgroundColor: "$green300"
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})