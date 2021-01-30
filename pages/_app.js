import '../core/styles/globals.scss'

import Head from 'next/head'
import ProgressBar from 'nextjs-progressbar'
import AuthProvider from '../core/contexts/AuthContext'
import LoadScreen from '../components/molecular/LoadScreen'

const App = ({ Component, pageProps }) => {
  return (
  <>
    <Head>
        <title>NextPLANET</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#060410"/>
    </Head>
    <LoadScreen />
    <ProgressBar color="black" startPosition={0.3} stopDelayMs={200} height="3" options={{showSpinner: false}}/>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}

export default App