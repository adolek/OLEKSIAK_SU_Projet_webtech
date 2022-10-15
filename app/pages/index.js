import React, {Component} from "react"; 
import Head from 'next/head'


class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

function App() {
  return (
    <div>
      <Head>
        <title>Accueil du blog</title>
      </Head>
      
      <Welcome name="Adrien and David" />
    
    </div>
  );
  }
  
export default App;
