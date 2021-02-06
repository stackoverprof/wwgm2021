import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import LoginPopUp from '@components/molecular/LoginPopUp'

const AuthArea = ({className, openAuthAction, setOpenAuthAction, toggleDropper}) => {
    const [openLoginPop, setOpenLoginPop] = useState(false)
    const { currentUser, role, authMethods, authState } = useAuth()
    
    const showLogin = () => {
        setOpenLoginPop(true)
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
                        <p>Angkasa</p>
                    </button>
                    <div className="auth-dropper flex-cc col">
                        <Link href={to.dashboard}>DASHBOARD</Link>
                        {role.admin && <Link href={to.dashboard}>ADMIN AREA</Link>}
                        <button onClick={authMethods.handleSignout} className="btn red">LOG OUT</button>
                    </div>
                </div>
            )}
        </div>
        <LoginPopUp open={openLoginPop} handleClose={() => setOpenLoginPop(false)}/>
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
        padding: 0 !important;
        height: 100%;
        min-width: 160px;

        p{
            font-size: 16px;
            font-weight: 600;
        }
        
        img{
            height: 30px;
            width: 30px;
            margin-right: 12px;
            margin-left: 12px;
            border-radius: 50%;
        }
    }

`

export default AuthArea