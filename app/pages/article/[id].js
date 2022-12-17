import supabase from "../../supabaseClient";
import Link from "next/link";
import Create from "../createComment";
import { useEffect, useState } from "react";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";

import { comment } from "postcss";

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
  const [comments, setComments] = useState(null);

  const [fetchArticle, setFetchArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();

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

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("articles_id", post.id);

      if (error) {
        console.log(error);
        setComments(null);
      }
      if (data) {
        console.log(data);
        setComments(data);
      }
    };

    fetchComments();
  }, []);

  /*const updateComment = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("comments")
      .update({ comments })
      .eq("articles_id", post.id)
      .select();

    if (error) {
      console.log(error);
      alert("Please fill the fields correctly !");
    }
    if (data) {
      console.log(data);
      alert("Data have been updated thank you !");
    }
  };*/

  const deleteComment = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("articles_id", post.id)
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

  useEffect(() => {
    fetchArticlesButtons();
  }, [session]);

  async function fetchArticlesButtons() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("articles")
        .select("*")
        .eq("id", post.id)
        .eq("profiles_id", user.id)
        .single();

      if (error && status !== 406) {
        setFetchArticle(null);
      }

      if (data) {
        setFetchArticle(user.id);
      }
    } catch (error) {
      //alert("Error loading user data!");
      console.log(error);
      setFetchArticle(null);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          {post.title}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          {fetchArticle ? (
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
          ) : (
            <div>
              <p>Content : {post.content}</p>
              <p> Date : {post.date}</p>
              <p> Author : {post.author}</p>
            </div>
          )}
        </div>
        {comments && (
          <form>
            {comments.map((comment) => (
              <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
                {comment.commentContent}
                <button
                  className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
                  onClick={deleteComment}
                >
                  delete
                </button>
              </div>
            ))}
          </form>
        )}
        <Create articles_id={post.id} />
      </main>
    </div>
  );
}
