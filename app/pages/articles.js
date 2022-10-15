import Head from 'next/head'
import data from './data'
import Link from 'next/link'


function Articles() {
    return (
        <div>
            {data.map(article => {
                return (
                    <ul>
                         <li>id : <Link href="/articles/{article.id}">
                                <a>{article.id}</a>
                            </Link></li>
                         <li>title : {article.title}</li>
                         <li>content : {article.content}</li>
                         <li>date : {article.date}</li>
                         <li>author : {article.author}</li>
                    </ul>

                )
            })}
        </div>
                
    );
}


function App() {
    return (
      <div>
        <Head>
            <title>Nos articles</title>
        </Head>
        <h1>Voici tous nos articles :</h1>
        <Articles />
      
      </div>
    );
  }
  
export default App;