import { styled } from "..";

export const ContainerButton = styled("div", {
  position: "relative",
  
  button: {
    border: 0,
    borderRadius: 6,
    padding: "1rem",
    color: '$gray100',
    backgroundColor: "$gray800",
  },

  "button:disabled": {
    color: '$icon',
  },

  span: {
    top: -16,
    left: +48,
    minHeight: 32,
    minWidth: 32,
    border: "4px solid",
    borderColor: "$gray900",
    position: "absolute",
    paddingInline: 8,

    transform: "trasnlate(-50%, 50%)",

    backgroundColor: "$green500",
    borderRadius: "100%",

    fontSize: "0.875rem",
    fontWeight: "bold",
    lineHeight: 1.7,

  }
})