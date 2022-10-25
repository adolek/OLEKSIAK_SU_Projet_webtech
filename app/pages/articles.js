import Head from 'next/head'
import data from './data'
import Link from 'next/link'


function Articles() {
    return (<div >
            {data.map(article => {
                return (
                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">
                    <ul class="italic">
                      <li>
                        id :{" "}
                        <Link
                          href={{
                            pathname: "/article/[id]",
                            query: { id: article.id}
                          }}
                        >
                          <a>{article.id}</a>
                        </Link>
                      </li>
                      <li>title : {article.title}</li>
                      <li>content : {article.content}</li>
                      <li>date : {article.date}</li>
                      <li>author : {article.author}</li>
                    </ul>
                  </div>
                );
            })}
        </div>     
    );
}


function App() {
    return (

      <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Articles</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center dark:text-gray-50">
      <h1 className="py-5 text-transparent bg-clip-text text-center font-bold text-8xl bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">Our articles</h1>

        
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
              <Articles/>
        </div>
      </main>
    </div>
    );
  }
  
export default App;