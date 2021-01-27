import React from 'react'
import { css } from '@emotion/css'
import Link from 'next/link'

const Navbar = ({big}) => {

    return (
        <div className={style({big})}>
            <div className="brand">
                <img src="/img/sgm-icon.png" alt=""/>
                <p>ArekSGM</p>
            </div>
            <div className="links">
                <Link href="">Try Out</Link>
                <Link href="">Kontak</Link>
                <Link href="">Tentang Kami</Link>
            </div>
        </div>
    )
}

const style = ({big}) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${big ? '88px' : '60px'};
    z-index: 100;

    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

    display: flex;
    justify-content: space-between;
    align-items: center;

    .brand{
        p{
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 30px;
            line-height: 45px;
            text-align: center;

            color: #0B4D29;
        }
    }
    .links{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default Navbar