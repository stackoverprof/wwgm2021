import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Navbar from '@components/molecular/Navbar'
import { AnimatePresence, motion } from 'framer-motion'
import { useLayout } from '@core/contexts/LayoutContext'

const HomeLayout = ({style, children}) => {
    const [navHeight, setNavHeight] = useState(0)
    const navRef = useRef(null)

    const { dimm } = useLayout()

    useEffect(() => {
        setNavHeight(navRef.current.firstChild.offsetHeight)
    }, [])

    return (
        <div css={layer({navHeight})} ref={navRef}>
            <Navbar/>
            <div css={style}>
                {children}
            </div>
            
            <AnimatePresence exitBeforeEnter>
                {dimm && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1, transition: { duration: 0.25 }}} 
                        exit={{ opacity: 0, transition: { duration: 0.25 }}}
                        className="dimm-layer fixed fullscreen flex-cs"
                    >
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const layer = ({navHeight}) => css`
    padding-top: ${navHeight}px;
    padding-bottom: 54px;

    .dimm-layer{
        background:  #000c;
        z-index: 99;
    }
`

export default HomeLayout