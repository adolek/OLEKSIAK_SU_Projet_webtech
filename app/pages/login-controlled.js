import React, { useState } from "react";

const MyForm = function () {
  const [state, setState] = useState();
  const [mdp, setMdp] = useState();

  const onSubmit = function (e) {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <form
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center"
        onSubmit={onSubmit}
      >
        <h2 className="dark:text-white">Login Controlled</h2>
        <div>
          <input type="text" name="my_input" id="my_input" />
        </div>
        <div>
          <input type="password" name="my_password" id="mdp" />
        </div>
        <div>
          <button
            className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
            onClick={async () => {
              setState(document.getElementById("my_input").value);
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
