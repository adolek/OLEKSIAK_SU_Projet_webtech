import supabase from "../../supabaseClient";
import Link from "next/link";
import Create from "../createComment";
import {Editor} from '@tinymce/tinymce-react'
import { useEffect, useState, useRef } from "react";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

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
  const [full_name, setFullname] = useState(null);
  const editorRef = useRef(null);

  const [fetchArticle, setFetchArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();

  const router = useRouter();

  const updateArticle = async (e) => {
    e.preventDefault();

    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

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
    router.reload(window.location.pathname);
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
    router.push("/");
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

  useEffect(() => {
    getUsername();
  }, [session]);

  async function getUsername() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profiles_id)
        .single();

      if (error && status !== 406) {
        setFullname(null);
      }

      if (data) {
        setFullname(data.full_name);
      }
    } catch (error) {
      //alert('Error loading user data!')
      console.log(error);
    } finally {
      setLoading(false);
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
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  value={content}
                  placeholder="<p>Ecrivez votre contenu ici.</p>"
                  apiKey="82nhcwhsadug2xceybwdoqcle6fajv6jp9oefyzpow5tq6fs"
                  cloudChannel="dev"
                  onChange={(e) => setContent(e.target.value)}
                  init={{
                    height: 100,
                    menubar: false,
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent charmap | " +
                      "image media removeformat table | preview code fullscreen " +
                      "help",

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        
                  }}
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
              <p>Content : <div dangerouslySetInnerHTML={{__html: post.content}}></div></p>
              <p> Date : {post.date}</p>
              <p> Author : {post.author}</p>
            </div>
          )}
        </div>
        {comments && (
          <form>
            {comments.map((comment) => (
              <Link href={"/comment/" + comment.id} key={comment.id}>
                <div className="cursor-pointer mt-6 w-96 rounded-xl border p-6 text-left ">
                  {full_name} {comment.commentContent}
                </div>
              </Link>
            ))}
          </form>
        )}
        <Create articles_id={post.id} />
      </main>
    </div>
  );
}
