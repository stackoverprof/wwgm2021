import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { to }from '@core/routepath'

const Navbar = ({clean}) => {
    if (clean) return <NavbarClean />
    
    return (
        <nav css={style} className="flex-cc">
            <div className="contain-size-xl flex-bc inner">
                <Link href={to.home}>
                    <div className="brand flex-cc">
                        <img src="/img/sgm-icon.png" className="no-pointer" alt=""/>
                        <p>WWGM 2021</p>
                    </div>
                </Link>
            </div> 
        </nav>
    )
}

const style = () => css` 
    //Nav tag core style is in globals.scss
    width: 100%;
    height: 64px;
    z-index: 100;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

    .inner{
        height: 100%;
    }
    
    .brand{
        cursor: pointer;

        img {
            height: 45px;
            margin-right: 12px;
        }
        
        p {
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