import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth } from '@core/contexts/AuthContext'
import to from '@core/routepath'

import MenuButton from '@components/atomic/MenuButton'
import LoginPopUp from '@components/molecular/LoginPopUp'

const Navbar = () => {
    const [openDropper, setOpenDropper] = useState(false)
    const [openLoginPop, setOpenLoginPop] = useState(false)
    const [openAuthAction, setOpenAuthAction] = useState(false)

    const toggleDropper = (value) => {
        setOpenDropper(value)
        setOpenAuthAction(false)
    }

    const showLogin = () => {
        setOpenLoginPop(true)
        toggleDropper(false)
    }

    return (
    <>  
        <nav css={style({openDropper, openAuthAction})}>
            <OutsideClickHandler onOutsideClick={() => toggleDropper(false)} disabled={!openDropper && !openAuthAction}>
                <div className="navbar-main flex-cc">
                    <div className="contain-size-xl flex-bc inner">
                        <Link href={to.home}>
                            <div className="brand flex-cc">
                                <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                                <p>WWGM 2021</p>
                            </div>
                        </Link>
                        <div className="wider links flex-cc">
                            <LinkSet openAuthAction={openAuthAction} setOpenAuthAction={setOpenAuthAction} showLogin={showLogin}/>
                        </div>
                        <MenuButton open={openDropper} toggleDropper={toggleDropper} breakpoint={950}/>
                    </div>
                </div>
                <div className="dropper links bg-blur flex-cc">
                    <div className="dropper-inner contain-size-m flex-cc">
                        <LinkSet openAuthAction={openAuthAction} setOpenAuthAction={setOpenAuthAction} showLogin={showLogin}/>
                    </div>
                </div>
            </OutsideClickHandler>
        </nav>
        <LoginPopUp open={openLoginPop} handleClose={() => setOpenLoginPop(false)}/>
    </>
    )
}

const LinkSet = ({openAuthAction, setOpenAuthAction, showLogin}) => {
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
        {authState !== 'user' && <button onClick={showLogin}>LOGIN</button>}
        {authState === 'user' && (
            <div className="auth-area">
                    <div onClick={() => setOpenAuthAction(!openAuthAction)} className="user-action btn flex-sc">
                        <img src={currentUser.photoURL} alt=""/>
                        <p>Angkasa</p>
                    </div>
                    <div className="auth-dropper flex-cc col">
                        <Link href={to.dashboard}>DASHBOARD</Link>
                        {role.admin && <Link href={to.dashboard}>ADMIN AREA</Link>}
                        <button onClick={authMethods.handleSignout} className="btn red">LOG OUT</button>
                    </div>
                </div>
        )}
        </div>
    </>
    )
}

const style = ({openDropper, openAuthAction}) => css` //Nav tag core style is in globals.scss
    width: 100%;
    height: 64px;
    z-index: 100;

    > div{
        height: 100%;
        width: 100%;
    }
    
    .navbar-main{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 101;
        background: rgba(255, 255, 255, ${openDropper ? 1 : 0.85});
        backdrop-filter: blur(8px);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    }

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

    .user-action{
        padding: 0;
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

    .dropper{
        position: absolute;
        display: none;
        width: 100%;
        max-height: 100vh;
        top: 100%;
        padding: 24px 0;
        background: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(0,0,0,0.1);  
        z-index: 100;
        transition: 0.5s;
        ${openDropper ? '' : 'max-height: 0;'}
        ${openDropper ? '' : 'padding: 0 !important;'}
        ${openDropper ? '' : 'pointer-events: none;'}
        ${openDropper ? '' : 'opacity: 0;'}
        
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