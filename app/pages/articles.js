import Head from 'next/head'
import data from './data'
import Link from 'next/link'


function Articles() {
    return (
        <div >
            {data.map(article => {
                return (
                  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
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
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="wt-title">
         Articles :
        </h1>
        <p className="mt-3 text-2xl">
           This is all our articles :
        </p>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
              <Articles/>
        </div>
      </main>
    </div>
    );
  }
  
export default App;