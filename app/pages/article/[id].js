import supabase from "../../supabaseClient";
import { useState, useEffect } from "react";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return {
    props: {
      post,
    },
  };
}

export default function Details({ post = {} }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [date, setDate] = useState(post.date);

  const updateArticle = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("articles")
      .update({ title, content, date })
      .eq("id", post.id)
      .select();

    if (error) {
      console.log(error);
      alert("Please fill the fields correctly !");
    }
    if (data) {
      console.log(data);
      alert("Data have been updated thank you !");
    }
  };

  const deleteArticle = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("articles")
      .delete()
      .eq("id", post.id)
      .select();

    if (error) {
      console.log(error);
      alert("error !");
    }
    if (data) {
      console.log(data);
      alert("Data have been deleted thank you !");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          {post.title}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <form>
            <label className="dark:text-white" htmlFor="title">
              title:
            </label>
            <div>
              <input
                className="dark:text-black"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label className="dark:text-white" htmlFor="content">
              Content:
            </label>
            <div>
              <textarea
                className="dark:text-black w-80"
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <label className="dark:text-white" htmlFor="date">
              date:
            </label>
            <div>
              <input
                className="dark:text-black"
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <p className="py-2"> Author : {post.author}</p>
            <button
              className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
              onClick={updateArticle}
            >
              update
            </button>
            <button
              className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
              onClick={deleteArticle}
            >
              delete
            </button>
          </form>
        </div>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <p>Comments : </p>
        </div>
      </main>
    </div>
  );
}
