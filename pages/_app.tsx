import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from 'next'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import UserLayout from '../components/UserLayout'

import { ReactNode } from "react";
import { Layout } from '../components/UserLayout';
// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

type ExtendedAppProps = AppProps & {
  Component: NextPage
}

// Styled component for Blank Layout component
// const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   height: "100vh",

//   // For V1 Blank layout pages
//   "& .content-center": {
//     display: "flex",
//     minHeight: "100vh",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: theme.spacing(5),
//   },

//   // For V2 Blank layout pages
//   "& .content-right": {
//     display: "flex",
//     minHeight: "100vh",
//     overflowX: "hidden",
//     position: "relative",
//   },
// }));

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >

      {getLayout( <Component {...pageProps} />)}
    </SessionContextProvider>
  )

  // const session = useSession();
  // return (
  //   <Layout session={session}>
  //     <BlankLayoutWrapper className="layout-wrapper">
  //       <Box
  //         className="app-content"
  //         sx={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}
  //       >
  //         <Component {...pageProps} />
  //       </Box>
  //     </BlankLayoutWrapper>
  //   </Layout>
  // );
}
