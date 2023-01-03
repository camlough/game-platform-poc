import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import UserLayout from "../components/layout/UserLayout";

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {getLayout(<Component {...pageProps} />)}
    </SessionContextProvider>
  );
}
