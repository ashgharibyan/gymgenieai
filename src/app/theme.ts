"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

const themeColors: MantineColorsTuple = [
  "#e9efff",
  "#d0daff",
  "#9fb2fd",
  "#6a88f9",
  "#3f63f6",
  "#224cf4",
  "#0f41f5",
  "#0034db",
  "#002dc4",
  "#0025ae",
];
export const theme = createTheme({
  primaryColor: "primary",
  primaryShade: 5,
  colors: {
    primary: themeColors,
  },
});
