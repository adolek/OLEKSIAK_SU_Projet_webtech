import Layout from "../components/layout";
import "../style/global.css";
import { UserContext } from "./userContext";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState, useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [supabase] = useState(() => createBrowserSupabaseClient())

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Layout>
      <UserContext.Provider value={value}>
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
          <Component {...pageProps} />
        </SessionContextProvider>
      </UserContext.Provider>
    </Layout>
  );
}

