import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'

import { useLayout } from '@core/contexts/LayoutContext'

const NoPesertaPopUp = ({handleClose}) => {

    const { setDimm } = useLayout()

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
        }
    }, [])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-ec col"
                >
                    
                </motion.div>
            </OutsideClickHandler>
        </div>    
    )
}

const style = css`
    padding-top: 100px;
    z-index: 99;
    pointer-events: none;
    
    > div {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pop-up{
        background: #fff;
        width: 272px;
        padding: 24px;
        border-radius: 8px;

        img{
            height: 200px;
            margin-bottom: 24px;
        }
    }
`

export default NoPesertaPopUp