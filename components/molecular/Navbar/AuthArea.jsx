import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import LoginPopUp from '@components/molecular/LoginPopUp'
import LogoutPopUp from '@components/molecular/LogoutPopUp'
import RunningText from '@components/atomic/RunningText'

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

    const { currentUser, role, authState } = useAuth()
    
    const showLogin = () => {
        if (openLoginPop) return
        setOpenLoginPop(true)
        toggleDropper(false)
    }   
    
    const showLogout = () => {
        if (openLogoutPop) return
        setOpenLogoutPop(true)
        toggleDropper(false)
    }   

    return (
    <>
        <div css={style({openAuthAction})} className={className}>
            {authState !== 'user' && <button onClick={showLogin}>LOGIN</button>}
            {authState === 'user' && (
                <div className="auth-area">
                    <button onClick={() => setOpenAuthAction(!openAuthAction)} className="user-action btn flex-sc">
                        <img src={currentUser.photoURL} alt=""/>
                        <RunningText offset={20}>{currentUser.displayName}</RunningText>
                        <div className="cover"></div>
                    </button>
                    <div className="auth-dropper flex-cc col">
                        <Link href={to.dashboard}>DASHBOARD</Link>
                        {role.admin && <Link href={to.dashboard}>ADMIN AREA</Link>}
                        <button onClick={showLogout} className="btn red">LOG OUT</button>
                    </div>
                </div>
            )}
        </div>
        <LoginPopUp open={openLoginPop} handleClose={() => setOpenLoginPop(false)}/>
        <LogoutPopUp open={openLogoutPop} handleClose={() => setOpenLogoutPop(false)}/>
    </>
    )
}

const style = ({openAuthAction}) => css`

    .auth-area{
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

        a{
            color: #0F1A12;
            margin: 6px 0;
            transition: 0.1s;

            &:hover{
                transform: scale(1.02);
            }
        }
        
        button{
            margin: 6px 0;
            padding: 8px 10px !important;
            transition: 0.5s ${openAuthAction ? '0s' : '.5s'};
            width: 76%;
            transform: scale(${openAuthAction ? 1 : 1.1});
            font-size: 20px;
        }
    }

    button.user-action{
        position: relative;
        padding: 0 !important;
        height: 100%;
        width: 180px;
        overflow: hidden;

        p{
            font-size: 16px;
            font-weight: 600;
            height: 100%;
        }
        
        img{
            height: 30px;
            width: 30px;
            margin-right: 12px;
            margin-left: 12px;
            border-radius: 50%;
        }

        .cover{
            position: absolute;
            height: 100%;
            width: 20%;
            top: 0;
            right: 0;
            pointer-events: none;
            background: linear-gradient(to right,  #0F1A1200 0%, #0F1A1244 40%, #0F1A12ff 80%);
        }
    }

`

export default AuthArea