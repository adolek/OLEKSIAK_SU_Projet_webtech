import React from "react";
import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Link from "next/link";

const Articles = () => {
  const { user } = useContext(UserContext);

  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from("articles").select("*");

      if (error) {
        setArticles(null);
      }

      if (data) {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>articles</title>
      </Head>

      <div className="py-5 bg-grey-800 dark:text-gray-50">
        Hello {user?.username}
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Fetch jokes
        </h1>
        {articles && (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full dark:text-gray-50">
            <div>
              {articles.map((article) => (
                <Link href={"/article/" + article.id} key={article.id}>
                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    <h1>Title: {article.title}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Articles;
