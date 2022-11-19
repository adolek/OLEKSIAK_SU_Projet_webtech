import React from "react";
import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "./userContext";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

const ContactsForm = () => {
  const { user } = useContext(UserContext);

  const [contacts, setContacts] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select();

      if (error) {
        setFetchError("Could not fetch the contacts");
        setContacts(null);
      }

      if (data) {
        setContacts(data);
        setFetchError(null);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>contacts</title>
      </Head>

      <div className="py-5 bg-grey-800 dark:text-gray-50">
        Hello ! {JSON.stringify(user, null, 2)}
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Fetch contacts database
        </h1>
        {fetchError && <p>{fetchError}</p>}
        {contacts && (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full dark:text-gray-50">
            {contacts.map((contact) => (
              <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
                <h2 className="text-2xl font-bold">
                  Name: {contact.firstname} {contact.lastname}
                </h2>
                <h3 className="mt-4 text-xl ">Email: {contact.email}</h3>
                <h3 className="mt-4 text-xl ">Message: {contact.message}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactsForm;
