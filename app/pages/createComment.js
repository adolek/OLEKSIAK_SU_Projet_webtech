import { useState } from "react";
import supabase from "../supabaseClient";

export default function Create({ articles_id }) {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentContent) {
      alert("Please fill in the field correctly !");
      return;
    }

    if (commentContent) {
      alert("Data have been sended thank you !");
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ articles_id, commentContent }]);

    if (error) {
      console.log(error);
      alert("Please fill the field correctly !");
    }
    if (data) {
      console.log(data);
      alert("Comment have been created thank you !");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
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
