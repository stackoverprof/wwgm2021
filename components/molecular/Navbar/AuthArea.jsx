import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { RiShieldFlashLine } from 'react-icons/ri'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import { to }from '@core/routepath'
import RunningText from '@components/atomic/RunningText'
import InitialAva from '@components/atomic/InitialAva'
import AlertHandler from '@components/atomic/AlertHandler'
import LoginPopUp from '@components/molecular/PopUps/LoginPopUp'
import LogoutPopUp from '@components/molecular/PopUps/LogoutPopUp'

const AuthArea = ({
    openAuthAction,
    openLoginPop,
    openLogoutPop,
    className,
    toggleDropper,
    setOpenLoginPop,
    setOpenLogoutPop,
    setOpenAuthAction
}) => {

    const { userData, access, authState, errorAuth, setErrorAuth } = useAuth()
    const { setDimm } = useLayout()
    
    const showLogin = {
        open: () => {
            setOpenLoginPop(true)
            toggleDropper(false)
        },
        close: () => {
            setOpenLoginPop(false)
            setDimm(false)
        }
    }
 
    const showLogout = {
        open: () => {
            setOpenLogoutPop(true)
            toggleDropper(false)
        },
        close: () => {
            setOpenLogoutPop(false)
            setDimm(false)
        }
    }

    useEffect(() => {
        
        return () => setOpenAuthAction(false)
    }, [])

    return (
    <>
        <div css={style({openAuthAction})} className={className}>
            {authState !== 'user' && (
                <button onClick={showLogin.open} disabled={openLoginPop} className="btn-login">
                    LOGIN 
                </button>
            )}
            {authState === 'user' && (
                <div className="auth-area">
                    <button onClick={() => setOpenAuthAction(!openAuthAction)} className="user-action btn flex-sc">
                        <InitialAva size={30} className="ava" src={userData.photoURL}/>
                        <RunningText offset={26}>{userData.displayName}</RunningText>
                        <div className="cover"></div>
                    </button>
                    <div className="auth-dropper flex-cc col">
                        {access.admin && (
                            <Link href={to.adminArea}>
                                <a className="flex-cc">
                                    ADMIN AREA &nbsp;<RiShieldFlashLine color="orange" />
                                </a>
                            </Link>
                        )}
                        <Link href={to.dashboard}>DASHBOARD</Link>
                        <button onClick={showLogout.open} className="btn red" disabled={openLogoutPop}>LOG OUT</button>
                    </div>
                </div>
            )}
        </div>
        
        <AnimatePresence exitBeforeEnter>
            {openLoginPop && <LoginPopUp handleClose={showLogin.close}/>}
            {openLogoutPop && <LogoutPopUp handleClose={showLogout.close}/>}
        </AnimatePresence>

        {errorAuth && <AlertHandler message={errorAuth} closeHandler={() => setErrorAuth('')} color="red"/>}
    </>
    )
}

const style = ({openAuthAction}) => css`
    margin-left: 12px;

    .auth-area {
        position: relative;
        height: 46px;
        max-width: 200px;
    }

    .auth-dropper{
        position: absolute;
        top: 114%;
        width: 100%;
        max-height: ${openAuthAction ? '100vh' : 0};
        background: white;
        box-shadow: 0 0 4px 0 #0005;
        border-radius: 8px;
        padding: ${openAuthAction ? '6px 0' : 0};
        opacity: ${openAuthAction ? 1 : 0};
        overflow: hidden;
        transition: all 0.5s, opacity  ${openAuthAction ? '0.5s 0s' : '0.25s 0.25s'};

        a {  
            font-family: Poppins;
            font-weight: 600;
            font-size: 18px;
            color: var(--army);
            text-align: center;
            margin: 6px 0;
            transition: 0.1s;

            &:hover{
                transform: scale(1.02);
            }
        }
        
        button {
            margin: 6px 0;
            padding: 8px 10px !important;
            transition: 0.5s ${openAuthAction ? '0s' : '.5s'};
            width: 76%;
            transform: scale(${openAuthAction ? 1 : 1.1});
            font-size: 20px;
        }
    }
    
    button.btn-login {
        background: var(--army-dark);
    }
    
    button.user-action {
        position: relative;
        padding: 0 !important;
        height: 100%;
        width: 180px;
        overflow: hidden;
        background: var(--army-dark);

        p {
            font-size: 16px;
            font-weight: 600;
            height: 100%;
        }
        
        .ava {
            margin: 0 10px;
        }

        .cover {
            position: absolute;
            height: 100%;
            width: 20%;
            top: 0;
            right: 0;
            pointer-events: none;
            background: linear-gradient(to right, #0C291900 0%, #0C291944 40%, #0C2919ff 80%);
        }
    }

`

export default AuthArea