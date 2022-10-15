import React from 'react';
import Head from 'next/head'


function Contacts() {
    return(
        <React.Fragment>
        <h1>Here is our contacts :</h1>
        <ul>
            <li>David SU - <a href="mailto:david.su@edu.ece.fr">david.su@edu.ece.fr</a></li>
            <li>Adrien OLEKSIAK - <a href="mailto:adrien.oleksiaksachoux@edu.ece.fr">adrien.oleksiaksachoux@edu.ece.fr</a></li>
        </ul>
        </React.Fragment>
    );
}

function App() {
    return (
      <div>
        <Head>
            <title>Nos contacts</title>
        </Head>
        <Contacts/>
      
      </div>
    );
  }
  
export default App;