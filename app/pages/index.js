import React from "react";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";
import Link from "next/link";

class Welcome extends React.Component {
  render() {
    return (
      <p className="mt-3 text-2xl dark:text-gray-50">
        Welcome, we are {this.props.name}, this is our blog project
      </p>
    );
  }
}

function App() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [session]);

  async function fetchArticles() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("articles")
        .select("*")
        .eq("profiles_id", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setArticles(data);
      }
    } catch (error) {
      //alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [session]);

  async function fetchComments() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("comments")
        .select("*")
        .eq("profiles_id", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setComments(data);
      }
    } catch (error) {
      //alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cursor-default flex min-h-screen flex-col items-center justify-center  ">
      <Head>
        <title>Home</title>
      </Head>

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
        {articles && (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full bg-grey-800 dark:text-gray-50">
            <div>
              <h1>My articles </h1>
              {articles.map((article) => (
                <Link href={"/article/" + article.id} key={article.id}>
                  <div className=" cursor-pointer shadow-lg mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    <h1>Title: {article.title}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {comments && (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full bg-grey-800 dark:text-gray-50">
            <div>
              <h1>My comments </h1>
              {comments.map((comment) => (
                <Link href={"/comment/" + comment.id} key={comment.id}>
                  <div className=" cursor-pointer shadow-lg mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    <h1>Title: {comment.commentContent}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
