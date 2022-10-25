import Layout from '../components/layout'
import '../style/global.css'

const theme = ({
  palette: {
    //mode: 'dark',
    primary: {
      light: '#6d6d6d',
      main: '#1b1b1b', //424242
      dark: '#1b1b1b',
      contrastText: '#000'
    },
    secondary: {
      light: '#ffff5a',
      main: '#ffff00',
      dark: '#c7cc00',
      contrastText: '#000'
    }
  }
});


export default function MyApp({ Component, pageProps }) {
  return (
    <Layout theme={theme}>
      <Component {...pageProps} />
    </Layout>
  );
}