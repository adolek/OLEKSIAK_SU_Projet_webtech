import React from "react";

const MyForm = function () {
  const onSubmit = function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("my_input"));
    console.log(data.get("my_password"));
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <form
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center "
        onSubmit={onSubmit}
      >
        <h2 className="dark:text-white">Login Native</h2>
        <div>
          <input type="text" name="my_input" />
        </div>
        <div>
          <input type="password" name="my_password" />
        </div>
        <div>
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
