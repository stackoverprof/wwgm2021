import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import MenuButton from '@components/atomic/MenuButton'
import LoginPopUp from '@components/molecular/LoginPopUp'

const Navbar = () => {
    const [dropper, setDropper] = useState(false)
    const [loginPopUp, setLoginPopUp] = useState(false)
    const [authAction, setAuthAction] = useState(false)

    return (
    <>  
        <OutsideClickHandler onOutsideClick={() => setDropper(false)} disabled={!dropper}>
            <nav css={style({dropper, authAction})} className="flex-cc">
                <div className="contain-size-xl flex-bc inner">
                    <Link href={to.home}>
                        <div className="brand flex-cc">
                            <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                            <p>WWGM 2021</p>
                        </div>
                    </Link>
                    <div className="wider links flex-cc">
                        <LinkSet authAction={authAction} setAuthAction={setAuthAction} setLoginPopUp={setLoginPopUp}/>
                    </div>
                    <MenuButton open={dropper} setOpen={setDropper} breakpoint={950}/>
                </div>
                <div className="dropper links bg-blur flex-cc">
                    <div className="dropper-inner contain-size-m flex-cc">
                        <LinkSet authAction={authAction} setAuthAction={setAuthAction} setLoginPopUp={setLoginPopUp}/>
                    </div>
                </div>
            </nav>
        </OutsideClickHandler>
        <LoginPopUp open={loginPopUp} handleClose={() => setLoginPopUp(false)}/>
    </>
    )
}

const LinkSet = ({authAction, setAuthAction, setLoginPopUp}) => {
    const { currentUser, role, authMethods, authState } = useAuth()
    
    return (
    <>
        <Link href={to.tryOut}>
            <div className="link-item flex-cc">
                <a>Try Out</a>
                <div className="bar"></div> 
            </div>
        </Link>
        <Link href={to.home}>
            <div className="link-item flex-cc">
                <a>Dokumentasi</a>
                <div className="bar"></div> 
            </div>
        </Link>
        <Link href={to.home}>
            <div className="link-item flex-cc">
                <a>Tentang Kami</a>
                <div className="bar"></div>
            </div>
        </Link>
        <div className="link-item login flex-cc">
        {authState !== 'user' && <button onClick={() => setLoginPopUp(true)}>LOGIN</button>}
        {authState === 'user' && (
            <div className="auth-area">
                <div onClick={() => setAuthAction(!authAction)} className="user-action btn flex-cc">
                    <img src={currentUser.photoURL} alt=""/>
                    <p>Angkasa</p>
                </div>
                <div className="auth-dropper flex-cc col">
                    <Link href={to.dashboard}>DASHBOARD</Link>
                    <button onClick={authMethods.handleSignout} className="btn red">LOG OUT</button>
                </div>
            </div>
        )}
        </div>
    </>
    )
}

const style = ({dropper, authAction}) => css` //Nav tag core style is in globals.scss
    width: 100%;
    height: 64px;
    background: rgba(255, 255, 255, ${dropper ? 1 : 0.85});
    backdrop-filter: blur(8px);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

    .auth-area{
        position: relative;
        height: 70%;
        max-width: 200px;
    }

    .auth-dropper{
        position: absolute;
        top: 110%;
        width: 100%;
        max-height: ${authAction ? '100vh' : 0};
        background: white;
        box-shadow: 0 0 4px 0 #0005;
        border-radius: 8px;
        padding: ${authAction ? '6px 0' : 0};
        opacity: ${authAction ? 1 : 0};
        overflow: hidden;
        transition: all 0.5s, opacity  ${authAction ? '0.5s 0s' : '0.25s 0.25s'};

        a, button{
            margin: 6px 0;
        }

        button{
            padding: 8px 10px !important;
            transition: 0.5s ${authAction ? '0s' : '.5s'};
            width: 76%;
            transform: scale(${authAction ? 1 : 1.1});
            font-size: 20px;
        }
    }

    .user-action{
        padding: 0 18px;
        height: 100%;

        p{
            font-size: 16px;
            font-weight: 600;
        }
        
        img{
            height: 70%;
            margin-right: 12px;
        }
    }

    .dropper{
        position: absolute;
        display: none;
        width: 100%;
        max-height: 100vh;
        top: 100%;
        overflow: hidden;
        padding: 24px 0;
        background: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(0,0,0,0.1);  

        transition: 0.5s;
        ${dropper ? '' : 'max-height: 0;'}
        ${dropper ? '' : 'padding: 0;'}
        ${dropper ? '' : 'opacity: 0;'}
        
        @media (max-width: 950px) {
            display: flex;
            padding: 12px 0;
        }
        
        @media (max-width: 640px) {      
            padding: 24px 0;      
            
            .dropper-inner{
                flex-direction: column;
                align-items: flex-start;
            }
            .login{
                margin-top: 12px !important;
            }    
        }
    }

    .inner{
        height: 100%;
    }
    
    .wider{
        height: 100%;
        @media (max-width: 950px) {
            display: none;
        }
    }

    .brand{
        cursor: pointer;

        img{
            height: 45px;
            margin-right: 12px;
        }
        p{
            font-family: Poppins;
            font-weight: bold;
            font-size: 27px;
            text-align: center;
            
            padding-top: 2px;

            color: #0f4125;
        }
    }

    .link-item{
        position: relative;
        height: 100%;
        font-family: Poppins;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
        padding: 0 12px;
        cursor: pointer;

        &.login{
            padding-left: 12px;
            padding-right: 0;

            button{
                padding: 8px 24px;
                z-index: 101;
            }
        }
        
        .bar{
            opacity: 0;
            height: 4px;
            position: absolute;
            bottom: 0;
            width: 0;
            background: #0f4125;
            transition: all 0.25s, opacity 0.1s;
            
        }

        &:hover {
            color: #1a693e;
            .bar{
                width: 90%;
                opacity: 1;
            }
        }

        @media (max-width: 950px) {
            padding: 12px;

            .bar{
                display: none;
            }
        }
    }
`

export default Navbar