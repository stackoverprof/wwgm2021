import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'
import useResize from 'use-resizing'

import { useLayout } from '@core/contexts/LayoutContext'
import to from '@core/routepath'
import MenuButton from '@components/atomic/MenuButton'
import NavbarClean from './NavbarClean'
import LinkSet from './LinkSet'

const Navbar = ({clean}) => {
    const [openDropper, setOpenDropper] = useState(false)
    const [openAuthAction, setOpenAuthAction] = useState(false)
    const [openLoginPop, setOpenLoginPop] = useState(false)
    const [openLogoutPop, setOpenLogoutPop] = useState(false)

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
                <div className="navbar-main">
                    <div className="bg-provider bg-blur"></div>
                    <div className="inner contain-size-xl flex-bc">
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
                                    openLogoutPop={openLogoutPop}
                                    setOpenLoginPop={setOpenLoginPop}
                                    setOpenLogoutPop={setOpenLogoutPop}
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
                    <div className="dropper links">
                        <div className="dropper-inner contain-size-m flex-cc">
                            <LinkSet
                                openLoginPop={openLoginPop}
                                openLogoutPop={openLogoutPop}
                                setOpenLoginPop={setOpenLoginPop}
                                setOpenLogoutPop={setOpenLogoutPop}
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

const style = ({openDropper, dimm}) => css` 
        //Nav tag core style is in globals.scss
        width: 100%;
        height: 64px;
        z-index: 100;

        > div {
            height: 100%;
            width: 100%;
            transition: 0.15s;

            &:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        }
        
        .navbar-main {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 101;
            transition: 0.25s ${dimm || openDropper ? '0s' : '0.5s'};
            background: rgba(255, 255, 255, ${openDropper || dimm ? 1 : 0.7});
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
            
            .inner {
                position: relative;
                z-index: 102;
                height: 100%;
            }

            .bg-provider {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 101;
            }
        }

        .dropper {
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
            
            a, button {
                transition: 0.25s;
                ${openDropper ? '' : 'opacity: 0;'}
            }

            .pop-up {
                opacity: 1;
                
                *{
                    opacity: 1;
                }
            }


            
            @media (max-width: 950px) {
                display: flex;
                padding: 12px 0;
            }
            
            @media (max-width: 700px) {      
                padding: 24px 0;      
                
                .dropper-inner {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .login {
                    margin-top: 12px !important;
                }    
            }
        }
        
        .wider {
            position: relative;
            height: 100%;
            @media (max-width: 950px) {
                display: none;
            }
        }

        .brand {
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

                color: var(--army);
            }
        }
    `

export default Navbar