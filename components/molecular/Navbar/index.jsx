import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'
import useResize from 'use-resizing'
import to from '@core/routepath'

import { useLayout } from '@core/contexts/LayoutContext'
import MenuButton from '@components/atomic/MenuButton'
import NavbarClean from './NavbarClean'
import AuthArea from './AuthArea'

const Navbar = ({clean}) => {
    const [openDropper, setOpenDropper] = useState(false)
    const [openAuthAction, setOpenAuthAction] = useState(false)
    const [openLoginPop, setOpenLoginPop] = useState(false)

    const { dimm } = useLayout()
    const screen = useResize().width

    const toggleDropper = (value) => {
        setOpenDropper(value)
        setOpenAuthAction(false)
    }

    if (clean) return <NavbarClean />

    return (
        <nav css={style({openDropper, dimm})}>
            <OutsideClickHandler onOutsideClick={() => toggleDropper(false)} disabled={!openDropper && !openAuthAction}>
                <div className="navbar-main flex-cc">
                    <div className="contain-size-xl flex-bc inner">
                        <Link href={to.home}>
                            <div className="brand flex-cc">
                                <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                                <p>WWGM 2021</p>
                            </div>
                        </Link>
                            {screen > 950 && (
                                <div className="wider links flex-cc">
                                    <LinkSet
                                        openLoginPop={openLoginPop}
                                        setOpenLoginPop={setOpenLoginPop}
                                        openAuthAction={openAuthAction}
                                        setOpenAuthAction={setOpenAuthAction}
                                        toggleDropper={toggleDropper}
                                    />
                                </div>
                            )}
                        <MenuButton open={openDropper} toggleDropper={toggleDropper} breakpoint={950}/>
                    </div>
                </div>
                {screen < 950 && (
                    <div className="dropper links bg-blur flex-cc">
                        <div className="dropper-inner contain-size-m flex-cc">
                            <LinkSet
                                openLoginPop={openLoginPop}
                                setOpenLoginPop={setOpenLoginPop}
                                openAuthAction={openAuthAction}
                                setOpenAuthAction={setOpenAuthAction}
                                toggleDropper={toggleDropper}
                            />
                        </div>
                    </div>
                )}
            </OutsideClickHandler>
        </nav>
    )
}

const LinkSet = ({
    openAuthAction,
    openLoginPop,
    toggleDropper,
    setOpenLoginPop,
    setOpenAuthAction
}) => {
    
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
        <AuthArea 
            className="link-item login flex-cc" 
            openAuthAction={openAuthAction}
            openLoginPop={openLoginPop}
            toggleDropper={toggleDropper}
            setOpenLoginPop={setOpenLoginPop}
            setOpenAuthAction={setOpenAuthAction}
        />
    </>
    )
}

const style = ({openDropper, dimm}) => css` //Nav tag core style is in globals.scss
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
        transition: 0.25s ${dimm ? 0 : '0.5s'};
        background: rgba(255, 255, 255, ${openDropper || dimm ? 1 : 0.85});
        backdrop-filter: blur(8px);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
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
        
        a, button{
            transition: 0.25s;
            ${openDropper ? '' : 'opacity: 0;'}
        }

        .pop-up{
            opacity: 1;
            
            *{
                opacity: 1;
            }
        }


        
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
        transition: 0.1s;

        &.login{
            padding-left: 12px;
            padding-right: 0;

            button{
                padding: 8px 24px;
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

            &:hover a{    
                transform: scale(1.02);
            }
        }
    }
`

export default Navbar