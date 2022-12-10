import supabase from "../../supabaseClient";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}

export default function Details({ id }) {
  const [contact, setContact] = useState(null);
  useEffect(() => {
    (async () => {
      // Fetch the record matching the `id` property
      let { data, error, status } = await supabase
        .from("contacts")
        // and apply its value with `setContact`.
        .setContact();
    })();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          {contact.firstname} {contact.lastname}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <h1>{contact.id}</h1>
          <p>{contact.email}</p>
          <p>{contact.message}</p>
        </div>
      </main>
    </div>
  );
}
