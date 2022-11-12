import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Clicked {count} times !
        </h1>
      </p>
      <button
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50"
        onClick={() => setCount(count + 1)}
      >
        Click
      </button>
    </div>
  );
}

export default Counter;
