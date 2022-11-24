import { useState } from "react";
import supabase from "../supabaseClient";
import { useContext } from "react";
import { UserContext } from "./userContext";

const Create = () => {
  const { user } = useContext(UserContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !email || !lastname || !message) {
      setFormError("Please fill in all the fields correctly !");
      return;
    }

    if (firstname && email && lastname && message) {
      setFormError("Data have been sended thank you !");
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ firstname, lastname, email, message }]);

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
        To contact us
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="dark:text-white" htmlFor="fistname">
          Firstname:
        </label>
        <div>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <label className="dark:text-white" htmlFor="lastname">
          Lastname:
        </label>
        <div>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <label className="dark:text-white" htmlFor="email">
          Email:
        </label>
        <div>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label className="dark:text-white" htmlFor="message">
          Message:
        </label>
        <div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Submit contact
          </button>
        </div>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
