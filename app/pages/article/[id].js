import { data } from "../../components/data";

export const getStaticProps = async ({ params }) => {
  const datas = data.filter((p) => p.id.toString() == params.id);

  return {
    props: { article: datas[0] },
  };
};

export const getStaticPaths = async () => {
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
