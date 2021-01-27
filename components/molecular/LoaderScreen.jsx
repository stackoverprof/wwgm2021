import React, { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { AnimatePresence, motion } from 'framer-motion'
import Spinner from '../atomic/Spinner'
    
const LoadScreen = () => {
    const [loaded, setloaded] = useState(false)

    const remover = () => {
        setloaded(true)
    }

    useEffect(() => {
        window.onload = remover
        const timeout = setTimeout(remover, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <AnimatePresence exitBeforeEnter>
            {!loaded && 
                <motion.div initial="visible" animate={{ opacity: 0.5, transition: { duration: 1 }}} exit={{ opacity: 0 }}>
                    <div className={style}>
                        <Spinner />
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
    
const style = css`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(245,245,245);
    transition: 1s;
    z-index: 50;
    top: 0;
    left: 0;
    padding-bottom: 10%;
`
    
export default LoadScreen