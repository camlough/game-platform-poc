// ** React Imports
import { useState, ReactNode } from "react";

// ** MUI Imports
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

// ** Components
import AppBar from "../header/AppBar";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

interface Props {
  children: ReactNode;
}

const UserLayout = (props: Props) => {
  // ** Props
  const { children } = props;

  // ** Vars
  const contentWidth = "boxed";

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        <MainContentWrapper className="layout-content-wrapper">
          <AppBar />
          <ContentWrapper
            className="layout-page-content"
            sx={{
              mx: "auto",
              ...(contentWidth === "boxed" && {
                "@media (min-width:1440px)": { maxWidth: 1440 },
                "@media (min-width:1200px)": { maxWidth: "100%" },
              }),
            }}
          >
            {children}
          </ContentWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>
    </>
  );
};

export default UserLayout;
