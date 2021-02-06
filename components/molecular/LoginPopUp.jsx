import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import GoogleAuth from '@components/atomic/GoogleAuth'

const LoginPopUp = ({open, handleClose}) => {
    const { authState } = useAuth()

    return (
        <AnimatePresence exitBeforeEnter>
            {open && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1, transition: { duration: 0.25 }}} 
                    exit={{ opacity: 0, transition: { duration: 0.25 }}} 
                    css={style} 
                    className="fixed fullscreen flex-cs"
                >
                    <OutsideClickHandler onOutsideClick={handleClose} disabled={!open} display="flex">
                        <motion.div 
                            initial={{ opacity: 0 , y: -25}} 
                            animate={{ opacity: 1, y: 0 , transition: { duration: 0.25, delay: 0.1}}} 
                            exit={{ opacity: 0, transition: { duration: 0.5 }}} 
                            className="pop-up flex-bc"
                        >
                            <div className="partition flex-cc">
                                <img src="/img/illus/login.svg" alt=""/>
                            </div>
                            <div className="partition flex-cs col">
                                
                                {authState !== 'user' ?
                                    <p className="instruction">Hai, mohon gunakan email yang sama dengan yang digunakan saat mengisi gform</p>
                                :
                                <p className="instruction">Berhasil Login! <br/> Selamat datang</p>
                                }
                                <div className="flex-cc">
                                    {authState !== 'user' && <GoogleAuth />}
                                    {authState !== 'user' && <button onClick={handleClose} className="btn bordered tutup">Tutup</button>}
                                    {authState === 'user' && <Link href={to.dashboard}><a className="btn tutup">Dashboard</a></Link>}
                                    {authState === 'user' && <button onClick={handleClose} className="btn bordered tutup">Tutup</button>}
                                </div>
                            </div>
                        </motion.div>
                    </OutsideClickHandler>
                </motion.div>    
            )}
        </AnimatePresence>
    )
}

const style = css`
    background:  #000c;
    padding-top: 100px;

    > div {
        width: 90%;
        max-width: 1000px;
        min-width: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .pop-up{
        background: #fff;
        height: 456px;
        width: 100%;
        border-radius: 12px;
    }

    .partition{
        width: 50%;
        height: 100%;
    }

    .btn{
        font-size: 16px;
        margin-right: 12px;

        &.tutup{
            padding: 12px 18px;
        }
    }

    p.instruction{
        max-width: 440px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 800;
        font-size: 34px;
        line-height: 51px;
        padding-bottom: 32px;
    }
`

export default LoginPopUp