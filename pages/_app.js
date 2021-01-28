import '../core/styles/globals.scss'
import '../core/services/firebase'

import Head from 'next/head'
import ProgressBar from 'nextjs-progressbar'
import LoadScreen from '../components/molecular/LoadScreen'
import AuthProvider from '../core/contexts/AuthContext'

function MyApp({ Component, pageProps }) {
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

export default MyApp