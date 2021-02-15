import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth } from '@core/contexts/AuthContext'

import { useLayout } from '@core/contexts/LayoutContext'

const LoginPopUp = ({handleClose}) => {
    const { authState, authMethods, setErrorAuth } = useAuth()

    const { setDimm } = useLayout()

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
            setErrorAuth('')
        }
    }, [])

    useEffect(() => {
        if (authState !== 'user') handleClose()
    }, [authState])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-ec col"
                >
                    <img src="/img/illus/logout.svg" alt=""/>
                    <p className="instruction">Konfirmasi Logout</p>
                    <div className="buttons flex-cc col">
                        <button onClick={authMethods.signOut} className="btn red">LOG OUT</button>
                        <button onClick={handleClose} className="btn bordered">BATAL</button>
                    </div>
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

    p.instruction{
        font-family: Poppins;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        margin-bottom: 24px;
    }

    .buttons{
        width: 100%;

        button{
            padding: 10px 0;
            margin: 8px;
            width: 100%;
        }
    }
`

export default LoginPopUp