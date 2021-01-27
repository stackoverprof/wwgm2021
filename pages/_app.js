import '../core/styles/globals.scss'

import ProgressBar from 'nextjs-progressbar'
import Head from 'next/head'
import AuthProvider from '../core/contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
        <title>NextPLANET</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#060410"/>
    </Head>
    <ProgressBar color="black" startPosition={0.3} stopDelayMs={200} height="3" options={{showSpinner: false}}/>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}

export default MyApp