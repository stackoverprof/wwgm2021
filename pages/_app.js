import Head from 'next/head'
import ProgressBar from 'nextjs-progressbar'

import '@core/styles/globals.scss'

import AuthProvider from '@core/contexts/AuthContext'
import LayoutProvider from '@core/contexts/LayoutContext'
import LoadScreen from '@components/molecular/LoadScreen'
import SEOTags from '@components/atomic/SEOTags'

const App = ({ Component, pageProps }) => {
    
    return (
    <>
        <Head>
            <title>WWGM 2021</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="theme-color" content="#08160E"/>
            <SEOTags />
        </Head>
        
        <LoadScreen />
        <ProgressBar
            color="#0C2919"
            startPosition={0.3}
            stopDelayMs={200}
            height="3"
            options={{showSpinner: false}}
        />
        
        <AuthProvider>
            <LayoutProvider>
                <Component {...pageProps} />
            </LayoutProvider>
        </AuthProvider>
    </>
    )
}

export default App