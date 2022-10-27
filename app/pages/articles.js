import Head from "next/head";
import Link from "next/link";
import { data } from "./data";

export const getStaticProps = async () => {
  return {
    props: { articles: data },
  };
};

const Articles = ({ articles }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Articles</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          All Articles :{" "}
        </h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div>
            {articles.map((article) => (
              <Link href={"/article/" + article.id} key={article.id}>
                <a>
                  <h3 className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    {article.title}
                  </h3>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Articles;
