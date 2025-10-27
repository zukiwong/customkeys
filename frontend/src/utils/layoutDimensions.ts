import { KeyboardLayout } from "../App";

export interface LayoutDimensions {
  svgWidth: number;
  svgHeight: number;
  basePadding: number;
}

const UNIT_SIZE = 54;
const GAP = 4;

export function getLayoutDimensions(layout: KeyboardLayout): LayoutDimensions {
  switch (layout) {
    case "61-key":
      return {
        // Max column is 15u (backspace ends at col 15)
        svgWidth: (15 * UNIT_SIZE) + (15 * GAP) + 40,
        // 5 rows (0-4), no F-row
        svgHeight: (5 * UNIT_SIZE) + (5 * GAP) + 40,
        basePadding: 3,
      };
    case "87-key":
      // Max column is 18.25u (Pause Break at col 17.25 + 1u width = 18.25)
      return {
        svgWidth: (18.25 * UNIT_SIZE) + (18.25 * GAP) + 40,
        // 6 rows (row -1 to row 4) = F-row + 5 main rows
        svgHeight: (6 * UNIT_SIZE) + (6 * GAP) + 40,
        basePadding: 3,
      };
    case "104-key":
      // Max column is 22.5u (numpad Enter at col 21.5 + 1u width = 22.5)
      return {
        svgWidth: (22.5 * UNIT_SIZE) + (22.5 * GAP) + 40,
        // 6 rows (row -1 to row 4) = F-row + 5 main rows
        svgHeight: (6 * UNIT_SIZE) + (6 * GAP) + 40,
        basePadding: 3,
      };
  }
}
