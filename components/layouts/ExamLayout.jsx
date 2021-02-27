import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Head from "next/head"
import { AnimatePresence, motion } from 'framer-motion'

import { useLayout } from '@core/contexts/LayoutContext'
import NavbarExam from '@components/molecular/Navbar/Customized/NavbarExam'
import AlertHandler from '@components/atomic/AlertHandler'

const MainLayout = ({className, title, css: style, children, noClearance, countdown, onTimeUp}) => {
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
            
            <NavbarExam countdown={countdown} onTimeUp={onTimeUp}/>
            <main css={style} className={className}>
                {children}
            </main>

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
    padding-bottom: 54px;
    height: 100%;

    .dimm-layer{
        background: #000c;
        z-index: 50;
    }
`

export default MainLayout