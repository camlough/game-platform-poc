import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ReactNode } from "react";
import { Layout } from '../components/Layout';
// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { useSession } from '../utils/hooks/useSession'
// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  // For V1 Blank layout pages
  "& .content-center": {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },

  // For V2 Blank layout pages
  "& .content-right": {
    display: "flex",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  const session = useSession();
  return (
    <Layout session={session}>
      <BlankLayoutWrapper className="layout-wrapper">
        <Box
          className="app-content"
          sx={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}
        >
          <Component {...pageProps} />
        </Box>
      </BlankLayoutWrapper>
    </Layout>
  );
}
