import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useRouter } from "next/router";

import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";
import { Router } from "express";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [full_name, setFullname] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    getUsername();
  }, [session]);

  async function getUsername() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("Please login !");
      return;
    } else {
      if (!title || !content || !date) {
        alert("Please fill in all the fields correctly !");
        return;
      }

      if (title && content && date) {
        alert("Article has been created thank you !");
      }

      const { data, error } = await supabase
        .from("articles")
        .insert([
          { title, date, content, author: full_name, profiles_id: user.id },
        ]);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        alert("Article has been created thank you !");
      }
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
        Create Article
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="dark:text-white" htmlFor="fistname">
          Title:
        </label>
        <div>
          <input
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
            className="w-80"
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <label className="dark:text-white" htmlFor="date">
          Date:
        </label>
        <div>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="py-2">
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
