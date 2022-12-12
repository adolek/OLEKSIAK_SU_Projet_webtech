import supabase from "../../supabaseClient";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("articles")
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
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          {post.title}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <p>Content : {post.content}</p>
          <p> Date : {post.date}</p>
          <p> Author : {post.author}</p>
        </div>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <p>Comments : </p>
        </div>
      </main>
      <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white">
        modify
      </button>
    </div>
  );
}
