import Layout from "../components/layout";
import "../style/global.css";
import { UserContext } from "./userContext";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState, useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <UserContext.Provider value={value}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Layout>
    </SessionContextProvider>
  );
}
