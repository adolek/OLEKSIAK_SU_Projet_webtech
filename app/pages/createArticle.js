import { useState } from "react";
import supabase from "../supabaseClient";
import { useContext } from "react";
import { UserContext } from "./userContext";

const Create = () => {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !date || !author) {
      setFormError("Please fill in all the fields correctly !");
      return;
    }

    if (title && content && date && author) {
      setFormError("Data have been sended thank you !");
    }

    const { data, error } = await supabase
      .from("articles")
      .insert([{ title, date, content, author }]);

    if (error) {
      console.log(error);
      setFormError("Please fill the fields correctly !");
    }
    if (data) {
      console.log(data);
      setFormError("Data have been sended thank you !");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-grey-800 dark:text-gray-50">
        Hello {JSON.stringify(user, null, 2)} !
      </div>
      <h2 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
        Create Article
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="dark:text-white" htmlFor="fistname">
          Title:
        </label>
        <div>
          <input
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

        <label className="dark:text-white" htmlFor="author">
          Author:
        </label>
        <div>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="py-2">
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Create Article
          </button>
        </div>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
