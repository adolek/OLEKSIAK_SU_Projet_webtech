import React from "react";
import Head from "next/head";

function Contacts() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>contacts</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">Our contacts</h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full dark:text-gray-50">
          <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
            <h2 className="text-2xl font-bold">David</h2>
            <h3 className="mt-4 text-xl hover:text-blue-600 focus:text-blue-600">
              {" "}
              <a href="https://github.com/Dvdbx"> &rarr; github: Dvdbx</a>
            </h3>
            <h3 className="mt-4 text-xl hover:text-blue-600 focus:text-blue-600">
              {" "}
              <a href="mailto:davidboxiang.su@edu.ece.fr">
                {" "}
                &rarr; mail: davidboxiang.su@edu.ece.fr
              </a>
            </h3>
          </div>
          <div className="mt-6 w-120 rounded-xl border p-6 text-left ">
            <h2 className="text-2xl font-bold">Adrien</h2>
            <h3 className="mt-4 text-xl hover:text-blue-600 focus:text-blue-600">
              {" "}
              <a href="https://github.com/adrienoleksiak">
                {" "}
                &rarr; github: adrienoleksiak
              </a>
            </h3>
            <h3 className="mt-4 text-xl hover:text-blue-600 focus:text-blue-600">
              {" "}
              <a href="mailto:adrien.oleksiaksachoux@edu.ece.fr">
                {" "}
                &rarr; mail: adrien.oleksiaksachoux@edu.ece.fr
              </a>
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <div>
      <Head>
        <title>Nos contacts</title>
      </Head>
      <Contacts />
    </div>
  );
}

export default App;
