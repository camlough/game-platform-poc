import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";
import { useUser } from "@supabase/auth-helpers-react";

import UserDropdown from "./UserDropdown";

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 6),
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: "100%",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    "padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out",
}));

const LayoutAppBar = () => {
  // ** Hooks
  const user = useUser();
  const router = useRouter();

  // ** Vars
  const contentWidth = "boxed";

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      position="static"
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          ...(contentWidth === "boxed" && {
            "@media (min-width:1440px)": {
              maxWidth: `calc(1440px - 1.5rem * 2)`,
            },
          }),
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            className="actions-left"
            sx={{ mr: 2, display: "flex", alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              onClick={() => router.push("/")}
              sx={{ ml: -2.75, mr: 3.5 }}
            >
              <Image
                width={60}
                height={60}
                alt="logo"
                src="/images/logos/saasy-games-1.png"
              />
            </IconButton>
          </Box>
          <Box
            className="actions-right"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {user ? (
              <UserDropdown />
            ) : (
              <Typography>
                <Link href="/login">Login / Sign Up</Link>
              </Typography>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
