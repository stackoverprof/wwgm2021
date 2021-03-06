import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Head from "next/head"
import { AnimatePresence, motion } from 'framer-motion'

import { useLayout } from '@core/contexts/LayoutContext'
import NavbarAdmin from '@components/molecular/Navbar/Customized/NavbarAdmin'
import AlertHandler from '@components/atomic/AlertHandler'
import Footer from '@components/molecular/Footer'

const AdminLayout = ({className, title, css: style, children, noClearance}) => {
    const [navHeight, setNavHeight] = useState(0)
    const navRef = useRef(null)

    const { dimm, globalAlert, setGlobalAlert } = useLayout()

    useEffect(() => {
        setNavHeight(navRef.current.firstChild.offsetHeight)

        return () => setGlobalAlert('')
    }, [])

    return (
        <div css={layer({navHeight, noClearance})} ref={navRef}>
            <Head>
                <title>WWGM 2021 {title ? `— ${title}` : ''}</title>
            </Head>
            
            <NavbarAdmin />
            <main css={style} className={className}>
                {children}
            </main>
            <Footer />

            <ShadowLayer dimm={dimm} />
            { globalAlert &&
                <AlertHandler 
                    message={globalAlert.body} 
                    closeHandler={() => setGlobalAlert('')} 
                    color={globalAlert.error ? 'red' : 'default'}
                />
            }
        </div>
    )
}

const ShadowLayer = ({dimm}) => {

    return (
        <AnimatePresence exitBeforeEnter>
            {dimm && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1, transition: { duration: 0.25 }}} 
                    exit={{ opacity: 0, transition: { duration: 0.25 }}}
                    className="dimm-layer fixed fullscreen-v flex-cs"
                >
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const layer = ({navHeight, noClearance}) => css`
    padding-top: ${noClearance ? 0 : navHeight}px;
    overflow: hidden;

    .dimm-layer{
        background:  #000c;
        z-index: 50;
    }
    
    main {
        padding-bottom: 54px;
    }
`

export default AdminLayout