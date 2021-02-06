import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import GoogleAuth from '@components/atomic/GoogleAuth'
import { useLayout } from '@core/contexts/LayoutContext'

const LoginPopUp = ({open, handleClose}) => {
    const { authState } = useAuth()

    const { setDimm } = useLayout()

    useEffect(() => {
        console.log('effected')
        setDimm(open)
    }, [open])

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
                            <div className="partition-40 flex-cc">
                                <img className="illus" src="/img/illus/login.svg" alt=""/>
                            </div>
                            <div className="partition-60 flex-cs col">
                                
                                {authState !== 'user' ?
                                    <p className="instruction">Hai, mohon gunakan email yang sama dengan yang digunakan saat mengisi gform</p>
                                :
                                    <p className="instruction bigger">Berhasil Login! <br/> Selamat datang</p>
                                }
                                <div className="buttons flex-cc">
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
    /* margin-top: 64px;
    background:  #000c; */
    padding-top: 100px;
    z-index: 99;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;

        @media (min-width: 720px) {
            width: 90%;
            max-width: 800px;
            min-width: 320px;
        }
    }

    img.illus{
        height: 200px;
        margin-left: 24px;

        @media (max-width: 720px) {
            margin-left: 0;
            margin-bottom: 32px;
        }
    }
    
    .pop-up{
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

    .partition{
        &-40{
            width: 40%;

            @media (max-width: 720px) {
                width: 100%;
            }
        }

        &-60{
            width: 60%;

            @media (max-width: 720px) {
                width: 90%;
                align-items: center;
            }
        }
    }

    .buttons{
        @media (max-width: 720px) {
            flex-direction: column;
        }
    }

    .btn{
        font-size: 16px;
        margin-right: 12px;

        @media (max-width: 720px) {
            min-width: 220px;
            margin: 6px 0;

            &.tutup{
                width: 100%;
                padding: 12px 0 !important;
            }
        }
        
        &.tutup{
            padding: 12px 18px;
        }
    }

    p.instruction{
        max-width: 320px;
        font-family: Poppins;
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        margin-bottom: 32px;

        &.bigger{
            font-size: 20px;
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