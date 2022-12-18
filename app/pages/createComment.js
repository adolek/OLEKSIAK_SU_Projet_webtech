import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useRouter } from "next/router";
import {
  useSupabaseClient,
  useSession,
  useUser,
} from "@supabase/auth-helpers-react";

export default function Create({ articles_id }) {
  const [commentContent, setCommentContent] = useState("");

  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      if (!commentContent) {
        alert("Please fill in the field correctly !");
        return;
      }

      if (commentContent) {
        alert("comment has been created thank you !");
      }

      if (session) {
        const { data, error } = await supabase
          .from("comments")
          .insert([{ articles_id, commentContent, profiles_id: user.id }]);
        if (error) {
          console.log(error);
          alert("Please fill the field correctly !");
        }

        if (data) {
          console.log(data);
          alert("Comment has been created thank you !");
        }
      } else {
        const { data, error } = await supabase
          .from("comments")
          .insert([{ articles_id, commentContent }]);
        if (error) {
          console.log(error);
          alert("Please fill the field correctly !");
        }

        if (data) {
          console.log(data);
          alert("Comment has been created thank you !");
        }
      }
      router.reload(window.location.pathname);
    }
  };

  return (
    <div className="py-10 items-center justify-center">
      <h2 className="text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
        Create Comment
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="dark:text-white" htmlFor="commentContent">
          Content:
        </label>
        <div>
          <textarea
            className="w-80 dark:text-black"
            type="text"
            id="commentContent"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
        <div className="py-2">
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Create Comment
          </button>
        </div>
      </form>
    </div>
  );
}
