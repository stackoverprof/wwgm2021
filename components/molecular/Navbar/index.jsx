import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '@core/routepath'

import MenuButton from '@components/atomic/MenuButton'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <nav css={style({open})} className="flex-cc bg-blur">
            <div className="contain-size-xl flex-bc inner">
                <Link href={to.home}>
                    <div className="brand flex-cc">
                        <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                        <p>WWGM 2021</p>
                    </div>
                </Link>
                <div className="wider links flex-cc">
                    <LinkSet />
                </div>
                <MenuButton open={open} setOpen={setOpen} breakpoint={950}/>
            </div>
            <div className="dropper links bg-blur flex-cc">
                <div className="contain-size-m flex-cc">
                    <LinkSet />
                </div>
            </div>
        </nav>
    )
}

const LinkSet = () => {
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
        <Link href={to.home}><button>LOGIN</button></Link>
    </>
    )
}

const style = ({open}) => css` //Nav tag core style is in globals.scss
    width: 100%;
    height: 64px;
    background: rgba(255, 255, 255, ${open ? 1 : 0.85});
    backdrop-filter: blur(8px);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);   
    
    .dropper{
        position: absolute;
        display: none;
        width: 100%;
        max-height: ${typeof window !== 'undefined' ? window.innerHeight : 1000}px;
        top: 100%;
        overflow: hidden;
        padding: 24px 0;
        background: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(0,0,0,0.1);  

        transition: 0.5s;
        ${open ? '' : 'max-height: 0;'}
        ${open ? '' : 'padding: 0;'}
        ${open ? '' : 'opacity: 0;'}
        
        @media (max-width: 950px) {
            display: flex;
        }
        
        @media (max-width: 640px) {            
            div{
                flex-direction: column;
                align-items: flex-start;
            }
            button{
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
        font-size: 20px;
        text-align: center;
        padding: 0 12px;
        cursor: pointer;

        &:hover {
            color: #1a693e;
            .bar{
                width: 80%;
                opacity: 1;
            }
        }

        .bar{
            opacity: 0;
            height: 4px;
            position: absolute;
            bottom: 0;
            width: 0;
            background: #0B4D29;
            transition: all 0.25s, opacity 0.1s;

        }

        @media (max-width: 950px) {
            padding: 12px;

            .bar{
                display: none;
            }
        }
    }
    button{
        padding: 8px 24px;
        font-weight: 600;
        font-size: 22px;
        letter-spacing: 0.04em;
        margin: 0;
        margin-left: 12px;
    }
`

export default Navbar