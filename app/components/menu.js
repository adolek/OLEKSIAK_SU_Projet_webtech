import Link from "next/link";

function Menu() {
  return (
    <nav className="relative w-full flex sm:justify-center space-x-4 flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      {[
        ["Home", "/"],
        ["Articles", "/articles"],
        ["About", "/about"],
        ["Contacts", "/contacts"],
      ].map(([title, url]) => (
        <a
          href={url}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
        >
          {title}
        </a>
      ))}
    </nav>
  );
}

export default Menu;
