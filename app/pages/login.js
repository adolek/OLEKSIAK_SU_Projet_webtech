import React from "react";
import supabase from "../supabaseClient";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import { useState } from "react";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      {!session ? (
        <Auth
          providers={["github"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
        />
      ) : (
        <Account session={session} />
      )}
    </main>
  );
};

export default Login;
