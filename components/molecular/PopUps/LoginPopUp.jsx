import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import { to, set } from '@core/routepath'
import GoogleAuth from '@components/atomic/GoogleAuth'

const LoginPopUp = ({handleClose}) => {
    const { userData, dataCompleted, authState, setErrorAuth } = useAuth()

    const { setDimm } = useLayout()

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
            setErrorAuth('')
        }
    }, [])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0 , transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-bc"
                >
                    <div className="partition-40 flex-cc">
                        {authState !== 'user' && <img className="illus" src="/img/illus/login.svg" alt=""/>}
                        {authState === 'user' && <img className="illus" src="/img/illus/login-success.svg" alt=""/>}
                    </div>
                    <div className="partition-60 flex-cs col">
                        
                        {authState !== 'user' ?
                            <p className="instruction">Hai, mohon gunakan email yang sama dengan yang digunakan saat mengisi gform</p>
                        : !dataCompleted ?
                            <p className="instruction">Halo {userData.displayName},<br/>Yuk lengkapi dulu biodatamu.</p>
                        :
                            <p className="instruction bigger">Berhasil Login! <br/> Halo {userData.displayName}</p>
                        }
                        
                        <div className="buttons flex-cc">
                            {authState !== 'user' && <GoogleAuth />}
                            {authState !== 'user' && <button onClick={handleClose} className="btn bordered tutup">Tutup</button>}
                            {authState === 'user' && !dataCompleted && <Link href={set.dashboard({action: 'edit'})}><a className="btn tutup">Lengkapi biodata</a></Link>}
                            {authState === 'user' && dataCompleted && <Link href={to.dashboard}><a className="btn tutup">Dashboard</a></Link>}
                            {authState === 'user' && <button onClick={handleClose} className="btn bordered tutup">Tutup</button>}
                        </div>
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

        @media (min-width: 720px) {
            width: 90%;
            max-width: 800px;
            min-width: 320px;
        }
    }

    img.illus {
        height: 200px;
        margin-left: 24px;

        @media (max-width: 720px) {
            margin-left: 0;
            margin-bottom: 32px;
        }
    }
    
    .pop-up {
        background: #fff;
        padding: 54px 0;
        width: 100%;
        border-radius: 12px;

        @media (max-width: 720px) {
            flex-direction: column;
            padding-bottom: 32px;
            width: 320px;
        }
    }

    .partition {
        &-40 {
            width: 40%;

            @media (max-width: 720px) {
                width: 100%;
            }
        }

        &-60 {
            width: 60%;

            @media (max-width: 720px) {
                width: 90%;
                align-items: center;
            }
        }
    }

    .buttons {
        button, .btn {
            max-height: 48px;
            height: 48px;
            min-height: 48px;
            padding: 0 18px !important;
        }

        @media (max-width: 720px) {
            flex-direction: column;
        }
    }

    .btn {
        font-size: 16px;
        margin-right: 12px;

        @media (max-width: 720px) {
            min-width: 220px;
            margin: 6px 0;
        }
    }

    p.instruction {
        max-width: 320px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        margin-bottom: 32px;

        &.bigger {
            font-size: 16px;
            
            @media (min-width: 720px){
                font-size: 28px;
            }
        }
        
        @media (max-width: 720px) {
            width: 90%;
            text-align: center;
            font-size: 15px;
            margin-bottom: 16px;
        }
    }
`

export default LoginPopUp