import Layout from '../components/layout'
import '../style/global.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}