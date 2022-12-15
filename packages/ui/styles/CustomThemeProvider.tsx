import React from "react";

import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "./globalTheme";

export function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
}
