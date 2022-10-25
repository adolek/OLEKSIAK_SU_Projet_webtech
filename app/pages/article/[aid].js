import { useRouter } from 'next/router'
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
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <p>id: {aid}</p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Article