import React, { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { AnimatePresence, motion } from 'framer-motion'
import Spinner from '../atomic/spinner/ThreeDot'
    
const LoadScreen = () => {
    const [loaded, setloaded] = useState(false)

    const remover = () => {
        setloaded(true)
        console.log('onload')
    }
    
    const fallback = () => {
        setloaded(true)
        console.log('fallback loader')
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
                <motion.div className={style} initial="visible" animate={{ opacity: 0.5, transition: { duration: 1 }}} exit={{ opacity: 0 }}>
                    <Spinner />
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: 1s;
    z-index: 101;
    padding-bottom: 10%;
`
    
export default LoadScreen