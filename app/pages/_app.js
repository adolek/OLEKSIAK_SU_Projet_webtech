import Layout from "../components/layout";
import "../style/global.css";
import { UserContext } from "./userContext";
import React, { useState, useMemo } from "react";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Layout>
      <UserContext.Provider value={value}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </Layout>
  );
}
