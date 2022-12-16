import React from "react";
import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "./userContext";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

class Welcome extends React.Component {
  render() {
    return (
      <p className="mt-3 text-2xl dark:text-gray-50">
        Welcome, we are {this.props.name}, this is our first website
      </p>
    );
  }
}

function App() {
  const { user, setUser } = useContext(UserContext);
  const session = useSession();
  const supabase = useSupabaseClient();
  const userSupa = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  ">
      <Head>
        <title>Home</title>
      </Head>
      <div className="py-5 bg-grey-800 dark:text-gray-50">
        Hello {userSupa?.full_name} !
      </div>
      {user ? (
        <button
          className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
          onClick={() => {
            setUser();
          }}
        >
          logout
        </button>
      ) : (
        <button
          className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
          onClick={async () => {
            const user = await supabase
              .from("profiles")
              .select(`full_name`)
              .eq("id", userSupa.id)
              .single();
            setUser(userSupa.full_name);
          }}
        >
          login
        </button>
      )}

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-grey-800">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Home
        </h1>

        <Welcome name="Adrien and David" />

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full bg-grey-800 dark:text-gray-50">
          <a
            href="https://reactjs.org/"
            className="shadow-lg mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600"
          >
            <h3 className="text-2xl font-bold">React &rarr;</h3>
            <p className="mt-4 text-xl">Find information about React.</p>
          </a>

          <a
            href="https://tailwindcss.com/"
            className="shadow-lg mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600"
          >
            <h3 className="text-2xl font-bold">Tailwinds &rarr;</h3>
            <p className="mt-4 text-xl">Find information about Tailwinds.</p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
