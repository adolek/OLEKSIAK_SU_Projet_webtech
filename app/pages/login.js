import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/account";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {!session ? (
          <Auth
            providers={["github"]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light dark:dark"
          />
        ) : (
          <Account session={session} />
        )}
      </main>
    </div>
  );
};

export default Login;
