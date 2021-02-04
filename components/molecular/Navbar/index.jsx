import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '@core/routepath'

const Navbar = () => {

    return (
        <nav css={style} className="flex-cc">
            <div className="contain-size-xl flex-bc">
                <div className="brand flex-cc">
                    <img src="/img/sgm-icon.png" alt=""/>
                    <p>WWGM 2021</p>
                </div>
                <div className="wider links flex-cc">
                    <LinkSet />
                </div>
            </div>
            <div className="dropper links flex-cc">
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
        <Link href={to.tryOut}>Try Out</Link>
        <Link href={to.home}>Dokumentasi</Link>
        <Link href={to.home}>Tentang Kami</Link>
        <Link href={to.home}><button>LOGIN</button></Link>
    </>
    )
}

const style = css` //Nav tag core style is in globals.scss
    width: 100%;
    height: 64px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);    

    .dropper{
        display: none;
        position: absolute;
        top: 100%;
        width: 100%;
        padding: 24px 0;
        background: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);    

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

    .wider{
        @media (max-width: 950px) {
            display: none;
        }
    }

    .brand{
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

            color: #0B4D29;
        }
    }

    .links{
        a{
            font-family: Poppins;
            font-weight: 600;
            font-size: 20px;
            text-align: center;
            margin: 12px;
        }
        button{
            padding: 8px 24px;
            font-weight: 600;
            font-size: 22px;
            letter-spacing: 0.04em;
            margin: 0;
            margin-left: 12px;
        }
    }
`

export default Navbar