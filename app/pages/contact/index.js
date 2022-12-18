import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import Link from "next/link";

const ContactsForm = () => {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select("*");

      if (error) {
        setContacts(null);
      }

      if (data) {
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="cursor-default flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>contacts</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Contacts
        </h1>
        <Link href="../contact-form">
          <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
            Contact us
          </button>
        </Link>
        {contacts && (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full dark:text-gray-50">
            <div>
              {contacts.map((contact) => (
                <Link href={"/contact/" + contact.id} key={contact.id}>
                  <div className="cursor-pointer shadow-lg mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    <h1>
                      Name: {contact.firstname} {contact.lastname}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactsForm;
