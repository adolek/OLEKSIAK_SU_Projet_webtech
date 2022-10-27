import Head from "next/head";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>About us</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          About us
        </h1>

        <p className="mt-3 text-2xl">
          Just two students working hard to create this website.
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            <h3 className="text-2xl font-bold">Adrien </h3>
            <p className="mt-4 text-xl">
              Like to code website, going out and have fun
            </p>
          </a>
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            <h3 className="text-2xl font-bold">David </h3>
            <p className="mt-4 text-xl">
              Like to learn, chill at home and read manga
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
