import supabase from "../../supabaseClient";

export const getServerSideProps = async () => {
  const user = await supabase.from("contacts").select();

  return {
    props: { user },
  };
};

const Details = ({ user }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          {user.firstname} {user.lastname}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <h1>{user.id}</h1>
          <p>{user.email}</p>
          <p>{user.message}</p>
        </div>
      </main>
    </div>
  );
};

export default Details;
