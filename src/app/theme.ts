"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

const themeColors: MantineColorsTuple = [
  "#eef3ff",
  "#dee2f2",
  "#bdc2de",
  "#98a0ca",
  "#7a84ba",
  "#6672b0",
  "#5c68ac",
  "#4c5897",
  "#424e88",
  "#364379",
];
export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: themeColors,
  },
});
