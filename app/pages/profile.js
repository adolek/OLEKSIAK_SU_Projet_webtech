import React from "react";
import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import supabase from "../supabaseClient";

const Profile = () => {

  const router = useRouter();
  const { user } = useContext(UserContext);

  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select('*');

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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Profile</title>
      </Head>

      <div className="py-5 bg-grey-800 dark:text-gray-50">
        Hello ! {user?.username} Here's your profile:
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <button type="button" onClick={() => {supabase.auth.signOut();router.push('/login');}}>
        Logout
        </button>
      </main>
    </div>
  );
};

export default Profile;
