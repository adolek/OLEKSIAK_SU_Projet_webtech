import React, {Component} from "react"; 
import Head from 'next/head'

class Welcome extends React.Component {
  render() {
    return <p className="mt-3 text-2xl dark:text-gray-50">
       Welcome, we are {this.props.name}, this is our first website
    </p>;
  }
}


function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 ">
      <Head>
        <title>index</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-grey-800">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">Home</h1>

        <Welcome name="Adrien and David" />

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full bg-grey-800 dark:text-gray-50">
          <a
            href="https://reactjs.org/"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">React &rarr;</h3>
            <p className="mt-4 text-xl">Find information about React.</p>
          </a>
          <a
            href="https://tailwindcss.com/"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
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
