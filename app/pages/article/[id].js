/*import { useRouter } from 'next/router'
import data from '../data'


const Article = () => {
  const router = useRouter()
  const { aid } = router.query

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="wt-title">
          <p>id of the article</p>
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
            <p>id: {aid}</p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Article*/

import { data } from "../data";

export const getStaticProps = async ({ params }) => {
  const datas = data.filter((p) => p.id.toString() == params.id);

  return {
    props: { article: datas[0] },
  };
};

export const getStaticPaths = async () => {
  // map data to an array of path objects with params (id)
  const paths = data.map((article) => {
    return {
      params: { id: article.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const Details = ({ article }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
        <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-6xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
          Details of {article.title}{" "}
        </h1>
        <div className="mt-6 w-96 rounded-xl border p-6 text-left ">
          <h1>{article.id}</h1>
          <p>{article.content}</p>
          <p>{article.date}</p>
          <p>{article.author}</p>
        </div>
      </main>
    </div>
  );
};

export default Details;
