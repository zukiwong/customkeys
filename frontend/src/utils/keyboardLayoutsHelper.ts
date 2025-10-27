import { KeycapData } from "../App";

// Helper function to create keycap with default values
export function createKeycap(
  id: string,
  row: number,
  col: number,
  width: number,
  text: string,
  fontSize: number = 14
): KeycapData {
  return {
    id,
    row,
    col,
    width,
    mainColor: "#E8E8E8",
    textColor: "#2C2C2C",
    text,
    fontSize,
    fontFamily: "Inter",
    fontWeight: "500",
    textAlign: "center",
    textTransform: "none",
  };
}
