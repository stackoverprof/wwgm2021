import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
    
const LoadScreen = () => {
    const [loaded, setloaded] = useState(false)

    const remover = () => {
        setloaded(true)
    }
    
    const fallback = () => {
        setloaded(true)
    }

    useEffect(() => {
        window.onload = remover
        const timeout = setTimeout(fallback, 3000)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <AnimatePresence exitBeforeEnter>
            {!loaded && 
                <motion.div
                    css={style}
                    className="flex-cc"
                    initial="visible"
                    animate={{ opacity: 0.2, transition: { duration: 1 }}} 
                    exit={{ opacity: 0, transition: { duration: 0.5 }}}
                >
                    <motion.div initial="visible" animate={{ opacity: 0, transition: { duration: 1 }}}>
                        <img src="/img/logo-wwgm.webp" alt=""/>
                    </motion.div>
                </motion.div>
            }       
        </AnimatePresence>
    )
}
    
const style = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    transition: 1s;
    z-index: 200;
    padding-bottom: 10%;

    img {
        position: relative;
        top: -40px;
        height: 140px;
    }
`
    
export default LoadScreen