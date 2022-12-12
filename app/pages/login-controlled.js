import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const MyForm = function () {
  const [state, setState] = useState();
  const [mdp, setMdp] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    console.log(state);
    const email = e.target.email.value;
    await supabase.auth.signIn({ email });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <form
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"
        onSubmit={onSubmit}
      >
        <h2 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Login Controlled
        </h2>
        <label className="dark:text-white" htmlFor="email">
          Email:
        </label>
        <div>
          <input type="email" name="email" id="email" />
        </div>
        <label className="dark:text-white" htmlFor="password">
          Password:
        </label>
        <div>
          <input type="password" name="my_password" id="mdp" />
        </div>
        <div className="py-4">
          <button
            className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
            onClick={async () => {
              setState(document.getElementById("email").value);
              setMdp(document.getElementById("mdp").value);
            }}
          >
            Submit
          </button>
        </div>
        <div className="dark:text-white">login : {state}</div>
        <div className="dark:text-white">mdp : {mdp}</div>
      </form>
    </div>
  );
};

export default MyForm;
