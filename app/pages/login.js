import React from "react";
import supabase from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { useState } from "react";

const Login = () => {
  const customTheme = {
    default: {
      colors: {
        brand: "hsl(153 60.0% 53.0%)",
        brandAccent: "hsl(154 54.8% 45.1%)",
        brandButtonText: "white",
      },
      dark: {
        colors: {
          brandButtonText: "white",
          defaultButtonBackground: "#2e2e2e",
          defaultButtonBackgroundHover: "#3e3e3e",
        },
      },
      evenDarker: {
        colors: {
          brandButtonText: "white",
          defaultButtonBackground: "#1e1e1e",
          defaultButtonBackgroundHover: "#2e2e2e",
        },
      },
    },
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <Auth
        supabaseClient={supabase}
        theme="default"
        appearance={{ theme: customTheme }}
      />
    </main>
  );
};

export default Login;
