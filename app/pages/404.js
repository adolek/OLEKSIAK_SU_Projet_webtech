import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Ooops...
        </h1>
        <h2>That page cannot be found :(</h2>
        <p>Going back to the Home page...</p>
      </main>
    </div>
  );
};

export default NotFound;
