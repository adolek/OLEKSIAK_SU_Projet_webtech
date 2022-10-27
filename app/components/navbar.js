import React from "react";
import Image from "next/image";
import useDarkMode from "../hooks/useDarkMode";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";

const Menu = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <nav className="relative w-full flex sm:justify-center space-x-4 flex-wrap items-center justify-between py-3 bg-gray-100 dark:bg-gray-700 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="logo">
        <Image src="/ece-logo.png" width={120} height={45}/>
      </div>
      {[
        ["Home", "/"],
        ["Articles", "/articles"],
        ["About", "/about"],
        ["Contacts", "/contacts"],
      ].map(([title, url]) => (
        <a
          href={url}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900 dark:text-gray-50 dark:hover:text-white"
        >
          {title}
        </a>
      ))}

      {colorTheme === "light" ? (
          <button
            onClick={() => setTheme("light")}
            className="flex items-center  gap-2 text-slate-700 px-2 py-2 rounded-lg cursor-pointer dark:text-indigo-500 dark:hover:text-gray-50 hover:text-indigo-500 ease-in duration-100"
          >
            <BsSun />
          </button>
        ) : (
          <button
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2 text-slate-700 px-2 py-2 rounded-lg cursor-pointer dark:text-indigo-500 dark:hover:text-gray-50 hover:text-indigo-500 ease-in duration-100"
          >
            <FiMoon />
          </button>
        )}

    </nav>
  );
}

export default Menu;
