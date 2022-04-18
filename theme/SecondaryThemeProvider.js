import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SecondaryTheme({ children }) {
  return (
    <ThemeProvider
      theme={(rootTheme) =>
        createTheme({
          ...rootTheme,
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  padding: "0rem 1.2rem",
                  borderRadius: "1.2rem",
                  height: "2rem",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                },
              },
            },
            MuiPaper: {
              styleOverrides: {
                root: {
                  borderRadius: "1.2rem",
                  border: '1px solid',
                  borderColor: rootTheme.palette.primary.main,
                },
              },
            },
            MuiCard : {
              styleOverrides : {
                root : {
                  border : 0
                }
              }
            },
            MuiAccordion : {
              styleOverrides : {
                root : {
                  border : 0
                }
              }
            }
          },
        })
      }
    >
      {children}
    </ThemeProvider>
  );
}
