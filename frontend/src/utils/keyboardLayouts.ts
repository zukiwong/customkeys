import { KeyboardLayout, KeycapData } from "../App";

// Helper function to create keycap with default values
function createKeycap(
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

export function getDefaultKeycaps(layout: KeyboardLayout): KeycapData[] {
  const layouts: Record<KeyboardLayout, KeycapData[]> = {
    "61-key": generate61Layout(),
    "87-key": generate87Layout(),
    "104-key": generate104Layout(),
  };

  return layouts[layout];
}

// 61-key layout (60%)
function generate61Layout(): KeycapData[] {
  const keycaps: KeycapData[] = [];
  let id = 0;

  // Row 0: Number row
  const row0 = [
    { key: "Esc", width: 1 },
    { key: "1", width: 1 },
    { key: "2", width: 1 },
    { key: "3", width: 1 },
    { key: "4", width: 1 },
    { key: "5", width: 1 },
    { key: "6", width: 1 },
    { key: "7", width: 1 },
    { key: "8", width: 1 },
    { key: "9", width: 1 },
    { key: "0", width: 1 },
    { key: "-", width: 1 },
    { key: "=", width: 1 },
    { key: "Backspace", width: 2 },
  ];

  // Row 1: QWERTY row
  const row1 = [
    { key: "Tab", width: 1.5 },
    { key: "Q", width: 1 },
    { key: "W", width: 1 },
    { key: "E", width: 1 },
    { key: "R", width: 1 },
    { key: "T", width: 1 },
    { key: "Y", width: 1 },
    { key: "U", width: 1 },
    { key: "I", width: 1 },
    { key: "O", width: 1 },
    { key: "P", width: 1 },
    { key: "[", width: 1 },
    { key: "]", width: 1 },
    { key: "\\", width: 1.5 },
  ];

  // Row 2: ASDF row
  const row2 = [
    { key: "Caps Lock", width: 1.75 },
    { key: "A", width: 1 },
    { key: "S", width: 1 },
    { key: "D", width: 1 },
    { key: "F", width: 1 },
    { key: "G", width: 1 },
    { key: "H", width: 1 },
    { key: "J", width: 1 },
    { key: "K", width: 1 },
    { key: "L", width: 1 },
    { key: ";", width: 1 },
    { key: "'", width: 1 },
    { key: "Enter", width: 2.25 },
  ];

  // Row 3: ZXCV row
  const row3 = [
    { key: "Shift", width: 2.25 },
    { key: "Z", width: 1 },
    { key: "X", width: 1 },
    { key: "C", width: 1 },
    { key: "V", width: 1 },
    { key: "B", width: 1 },
    { key: "N", width: 1 },
    { key: "M", width: 1 },
    { key: ",", width: 1 },
    { key: ".", width: 1 },
    { key: "/", width: 1 },
    { key: "Shift", width: 2.75 },
  ];

  // Row 4: Bottom row
  const row4 = [
    { key: "Ctrl", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "Alt", width: 1.25 },
    { key: "Space", width: 6.25 },
    { key: "Alt", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "ScrLk", width: 1.25 },
    { key: "Ctrl", width: 1.25 },
  ];

  const rows = [row0, row1, row2, row3, row4];

  rows.forEach((row, rowIndex) => {
    let colOffset = 0;
    row.forEach((item) => {
      keycaps.push({
        id: `key-${id++}`,
        row: rowIndex,
        col: colOffset,
        width: item.width,
        mainColor: "#E8E8E8",
        textColor: "#2C2C2C",
        text: item.key,
        fontSize: 14,
        fontFamily: "Inter",
        fontWeight: "500",
        textAlign: "center",
        textTransform: "none",
      });
      colOffset += item.width;
    });
  });

  return keycaps;
}

// 87-key layout (TKL)
function generate87Layout(): KeycapData[] {
  const keycaps: KeycapData[] = [];
  let id = 0;

  // Row -1: Function row
  const rowF = [
    { key: "Esc", width: 1, col: 0 },
    { key: "F1", width: 1, col: 2 },
    { key: "F2", width: 1, col: 3 },
    { key: "F3", width: 1, col: 4 },
    { key: "F4", width: 1, col: 5 },
    { key: "F5", width: 1, col: 6.5 },
    { key: "F6", width: 1, col: 7.5 },
    { key: "F7", width: 1, col: 8.5 },
    { key: "F8", width: 1, col: 9.5 },
    { key: "F9", width: 1, col: 11 },
    { key: "F10", width: 1, col: 12 },
    { key: "F11", width: 1, col: 13 },
    { key: "F12", width: 1, col: 14 },
    { key: "PrtSc", width: 1, col: 15.25 },
    { key: "Scroll\nLock", width: 1, col: 16.25 },
    { key: "Pause\nBreak", width: 1, col: 17.25 },
  ];

  rowF.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: -1,
      col: item.col,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 0: Number row with nav cluster
  const row0Main = [
    { key: "`", width: 1 },
    { key: "1", width: 1 },
    { key: "2", width: 1 },
    { key: "3", width: 1 },
    { key: "4", width: 1 },
    { key: "5", width: 1 },
    { key: "6", width: 1 },
    { key: "7", width: 1 },
    { key: "8", width: 1 },
    { key: "9", width: 1 },
    { key: "0", width: 1 },
    { key: "-", width: 1 },
    { key: "=", width: 1 },
    { key: "Backspace", width: 2 },
  ];

  const row0Nav = [
    { key: "Insert", col: 15.25 },
    { key: "Home", col: 16.25 },
    { key: "PgUp", col: 17.25 },
  ];

  let colOffset = 0;
  row0Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 0,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
    colOffset += item.width;
  });

  row0Nav.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 0,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 1: QWERTY row
  const row1Main = [
    { key: "Tab", width: 1.5 },
    { key: "Q", width: 1 },
    { key: "W", width: 1 },
    { key: "E", width: 1 },
    { key: "R", width: 1 },
    { key: "T", width: 1 },
    { key: "Y", width: 1 },
    { key: "U", width: 1 },
    { key: "I", width: 1 },
    { key: "O", width: 1 },
    { key: "P", width: 1 },
    { key: "[", width: 1 },
    { key: "]", width: 1 },
    { key: "\\", width: 1.5 },
  ];

  const row1Nav = [
    { key: "Delete", col: 15.25 },
    { key: "End", col: 16.25 },
    { key: "PgDn", col: 17.25 },
  ];

  colOffset = 0;
  row1Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 1,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
    colOffset += item.width;
  });

  row1Nav.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 1,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 2: ASDF row
  const row2 = [
    { key: "Caps Lock", width: 1.75 },
    { key: "A", width: 1 },
    { key: "S", width: 1 },
    { key: "D", width: 1 },
    { key: "F", width: 1 },
    { key: "G", width: 1 },
    { key: "H", width: 1 },
    { key: "J", width: 1 },
    { key: "K", width: 1 },
    { key: "L", width: 1 },
    { key: ";", width: 1 },
    { key: "'", width: 1 },
    { key: "Enter", width: 2.25 },
  ];

  colOffset = 0;
  row2.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 2,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
    colOffset += item.width;
  });

  // Row 3: ZXCV row with arrow up
  const row3 = [
    { key: "Shift", width: 2.25 },
    { key: "Z", width: 1 },
    { key: "X", width: 1 },
    { key: "C", width: 1 },
    { key: "V", width: 1 },
    { key: "B", width: 1 },
    { key: "N", width: 1 },
    { key: "M", width: 1 },
    { key: ",", width: 1 },
    { key: ".", width: 1 },
    { key: "/", width: 1 },
    { key: "Shift", width: 2.75 },
  ];

  colOffset = 0;
  row3.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 3,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
    colOffset += item.width;
  });

  // Arrow up
  keycaps.push({
    id: `key-${id++}`,
    row: 3,
    col: 16.25,
    width: 1,
    mainColor: "#E8E8E8",
    textColor: "#2C2C2C",
    text: "↑",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    textAlign: "center",
    textTransform: "none",
  });

  // Row 4: Bottom row with arrows
  const row4 = [
    { key: "Ctrl", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "Alt", width: 1.25 },
    { key: "Space", width: 6.25 },
    { key: "Alt", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "Fn", width: 1.25 },
    { key: "Ctrl", width: 1.25 },
  ];

  colOffset = 0;
  row4.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 4,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
    colOffset += item.width;
  });

  // Arrow keys
  const arrows = [
    { key: "←", col: 15.25 },
    { key: "↓", col: 16.25 },
    { key: "→", col: 17.25 },
  ];

  arrows.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 4,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  return keycaps;
}

// 104-key layout (Full size)
function generate104Layout(): KeycapData[] {
  const keycaps: KeycapData[] = [];
  let id = 0;

  // Row -1: Function row
  const rowF = [
    { key: "Esc", width: 1, col: 0 },
    { key: "F1", width: 1, col: 2 },
    { key: "F2", width: 1, col: 3 },
    { key: "F3", width: 1, col: 4 },
    { key: "F4", width: 1, col: 5 },
    { key: "F5", width: 1, col: 6.5 },
    { key: "F6", width: 1, col: 7.5 },
    { key: "F7", width: 1, col: 8.5 },
    { key: "F8", width: 1, col: 9.5 },
    { key: "F9", width: 1, col: 11 },
    { key: "F10", width: 1, col: 12 },
    { key: "F11", width: 1, col: 13 },
    { key: "F12", width: 1, col: 14 },
    { key: "PrtSc", width: 1, col: 15.25 },
    { key: "Scroll\nLock", width: 1, col: 16.25 },
    { key: "Pause\nBreak", width: 1, col: 17.25 },
  ];

  rowF.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: -1,
      col: item.col,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 0: Number row with nav cluster and numpad
  const row0Main = [
    { key: "`", width: 1 },
    { key: "1", width: 1 },
    { key: "2", width: 1 },
    { key: "3", width: 1 },
    { key: "4", width: 1 },
    { key: "5", width: 1 },
    { key: "6", width: 1 },
    { key: "7", width: 1 },
    { key: "8", width: 1 },
    { key: "9", width: 1 },
    { key: "0", width: 1 },
    { key: "-", width: 1 },
    { key: "=", width: 1 },
    { key: "Backspace", width: 2 },
  ];

  const row0Nav = [
    { key: "Insert", col: 15.25 },
    { key: "Home", col: 16.25 },
    { key: "PgUp", col: 17.25 },
  ];

  const row0Num = [
    { key: "Num\nLock", col: 18.5 },
    { key: "/", col: 19.5 },
    { key: "*", col: 20.5 },
    { key: "-", col: 21.5 },
  ];

  let colOffset = 0;
  row0Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 0,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
    colOffset += item.width;
  });

  row0Nav.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 0,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
  });

  row0Num.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 0,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
  });

  // Row 1: QWERTY row
  const row1Main = [
    { key: "Tab", width: 1.5 },
    { key: "Q", width: 1 },
    { key: "W", width: 1 },
    { key: "E", width: 1 },
    { key: "R", width: 1 },
    { key: "T", width: 1 },
    { key: "Y", width: 1 },
    { key: "U", width: 1 },
    { key: "I", width: 1 },
    { key: "O", width: 1 },
    { key: "P", width: 1 },
    { key: "[", width: 1 },
    { key: "]", width: 1 },
    { key: "\\", width: 1.5 },
  ];

  const row1Nav = [
    { key: "Delete", col: 15.25 },
    { key: "End", col: 16.25 },
    { key: "PgDn", col: 17.25 },
  ];

  const row1Num = [
    { key: "7", col: 18.5, height: 1 },
    { key: "8", col: 19.5, height: 1 },
    { key: "9", col: 20.5, height: 1 },
    { key: "+", col: 21.5, height: 2 }, // 2u tall, spans row 1 and 2
  ];

  colOffset = 0;
  row1Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 1,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
    colOffset += item.width;
  });

  row1Nav.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 1,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
  });

  row1Num.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 1,
      col: item.col,
      width: 1,
      height: item.height,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 2: ASDF row
  const row2Main = [
    { key: "Caps Lock", width: 1.75 },
    { key: "A", width: 1 },
    { key: "S", width: 1 },
    { key: "D", width: 1 },
    { key: "F", width: 1 },
    { key: "G", width: 1 },
    { key: "H", width: 1 },
    { key: "J", width: 1 },
    { key: "K", width: 1 },
    { key: "L", width: 1 },
    { key: ";", width: 1 },
    { key: "'", width: 1 },
    { key: "Enter", width: 2.25 },
  ];

  const row2Num = [
    { key: "4", col: 18.5 },
    { key: "5", col: 19.5 },
    { key: "6", col: 20.5 },
  ];

  colOffset = 0;
  row2Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 2,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
    colOffset += item.width;
  });

  row2Num.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 2,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
  });

  // Row 3: ZXCV row
  const row3Main = [
    { key: "Shift", width: 2.25 },
    { key: "Z", width: 1 },
    { key: "X", width: 1 },
    { key: "C", width: 1 },
    { key: "V", width: 1 },
    { key: "B", width: 1 },
    { key: "N", width: 1 },
    { key: "M", width: 1 },
    { key: ",", width: 1 },
    { key: ".", width: 1 },
    { key: "/", width: 1 },
    { key: "Shift", width: 2.75 },
  ];

  const row3Num = [
    { key: "1", col: 18.5, height: 1 },
    { key: "2", col: 19.5, height: 1 },
    { key: "3", col: 20.5, height: 1 },
    { key: "Enter", col: 21.5, height: 2 }, // 2u tall, spans row 3 and 4
  ];

  colOffset = 0;
  row3Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 3,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
    colOffset += item.width;
  });

  // Arrow up
  keycaps.push({
    id: `key-${id++}`,
    row: 3,
    col: 16.25,
    width: 1,
    mainColor: "#E8E8E8",
    textColor: "#2C2C2C",
    text: "↑",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    textAlign: "center",
  });

  row3Num.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 3,
      col: item.col,
      width: 1,
      height: item.height,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  // Row 4: Bottom row
  const row4Main = [
    { key: "Ctrl", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "Alt", width: 1.25 },
    { key: "Space", width: 6.25 },
    { key: "Alt", width: 1.25 },
    { key: "Win", width: 1.25 },
    { key: "Fn", width: 1.25 },
    { key: "Ctrl", width: 1.25 },
  ];

  const row4Arrows = [
    { key: "←", col: 15.25 },
    { key: "↓", col: 16.25 },
    { key: "→", col: 17.25 },
  ];

  const row4Num = [
    { key: "0", col: 18.5, width: 2, height: 1 },
    { key: ".", col: 20.5, width: 1, height: 1 },
  ];

  colOffset = 0;
  row4Main.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 4,
      col: colOffset,
      width: item.width,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
    colOffset += item.width;
  });

  row4Arrows.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 4,
      col: item.col,
      width: 1,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
    });
  });

  row4Num.forEach((item) => {
    keycaps.push({
      id: `key-${id++}`,
      row: 4,
      col: item.col,
      width: item.width,
      height: item.height,
      mainColor: "#E8E8E8",
      textColor: "#2C2C2C",
      text: item.key,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: "500",
      textAlign: "center",
      textTransform: "none",
    });
  });

  return keycaps;
}
