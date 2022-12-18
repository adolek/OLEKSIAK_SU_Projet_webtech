import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("comments")
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
  const [commentContent, setComments] = useState(post.commentContent);
  const [full_name, setFullname] = useState(null);

  const [fetchComment, setFetchComment] = useState(null);
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
        .eq("id", post.profiles_id)
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

  useEffect(() => {
    fetchCommentsButtons();
  }, [session]);

  async function fetchCommentsButtons() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("comments")
        .select("*")
        .eq("id", post.id)
        .eq("profiles_id", user.id)
        .single();

      if (error && status !== 406) {
        setFetchComment(null);
      }

      if (data) {
        setFetchComment(user.id);
      }
    } catch (error) {
      //alert("Error loading user data!");
      console.log(error);
      setFetchComment(null);
    } finally {
      setLoading(null);
    }
  }

  const updateComment = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("comments")
      .update({ commentContent })
      .eq("id", post.id)
      .select();

    if (error) {
      console.log(error);
      alert("Please fill the fields correctly !");
    }
    if (data) {
      console.log(data);
      alert("Comment has been updated thank you !");
    }
  };

  const deleteComment = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", post.id)
      .select();

    if (error) {
      console.log(error);
      alert("error !");
    }
    if (data) {
      console.log(data);
      alert("Comment has been deleted thank you !");
    }
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Comment{" "}
        </h1>
        {fetchComment ? (
          <form>
            <label className="dark:text-white" htmlFor="commentContent">
              Content:
            </label>
            <div>
              <textarea
                className="dark:text-black w-80"
                type="text"
                id="commentContent"
                value={commentContent}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <button
              className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
              onClick={updateComment}
            >
              update
            </button>
            <button
              className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
              onClick={deleteComment}
            >
              delete
            </button>
          </form>
        ) : (
          <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
            <p>Content : {post.commentContent}</p>
            <p>{full_name}</p>
          </div>
        )}
      </main>
    </div>
  );
}
