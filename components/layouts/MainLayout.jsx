import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Navbar from '@components/molecular/Navbar'
import { AnimatePresence, motion } from 'framer-motion'
import { useLayout } from '@core/contexts/LayoutContext'
import AlertHandler from '@components/atomic/AlertHandler'

const MainLayout = ({className, css: style, children, directLogin, noClearance}) => {
    const [navHeight, setNavHeight] = useState(0)
    const navRef = useRef(null)

    const { dimm, globalAlert, setGlobalAlert } = useLayout()

    useEffect(() => {
        setNavHeight(navRef.current.firstChild.offsetHeight)

        return () => setGlobalAlert('')
    }, [])

    return (
        <div css={layer({navHeight, noClearance})} ref={navRef}>
            <Navbar directLogin={directLogin}/>
            <div css={style} className={className}>
                {children}
            </div>
            
            <AnimatePresence exitBeforeEnter>
                {dimm && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1, transition: { duration: 0.25 }}} 
                        exit={{ opacity: 0, transition: { duration: 0.25 }}}
                        className="dimm-layer fixed fullscreen-vh flex-cs"
                    >
                    </motion.div>
                )}
            </AnimatePresence>

            {globalAlert && <AlertHandler message={globalAlert.body} closeHandler={() => setGlobalAlert('')} color={globalAlert.error ? 'red' : 'default'}/>}
        </div>
    )
}

const layer = ({navHeight, noClearance}) => css`
    padding-top: ${noClearance ? 0 : navHeight}px;
    padding-bottom: 54px;
    overflow: hidden;

    .dimm-layer{
        background:  #000c;
        z-index: 50;
    }
`

export default MainLayout