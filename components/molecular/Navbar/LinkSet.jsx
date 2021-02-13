import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '@core/routepath'

import AuthArea from './AuthArea'

const LinkSet = ({
    openAuthAction,
    openLoginPop,
    openLogoutPop,
    toggleDropper,
    setOpenLoginPop,
    setOpenLogoutPop,
    setOpenAuthAction
}) => {
    
    return (
    <>
        <LinkItem route={to.tryOut}>Try Out</LinkItem>
        <LinkItem route={to.home}>Dokumentasi</LinkItem>
        <LinkItem route={to.home}>Tentang Kami</LinkItem>
        <AuthArea 
            className="login flex-cc" 
            openAuthAction={openAuthAction}
            toggleDropper={toggleDropper}
            openLoginPop={openLoginPop}
            openLogoutPop={openLogoutPop}
            setOpenAuthAction={setOpenAuthAction}
            setOpenLoginPop={setOpenLoginPop}
            setOpenLogoutPop={setOpenLogoutPop}
        />
    </>
    )
}

const LinkItem = ({route, children}) => {

    return (
        <Link href={route}>
            <div css={style} className="flex-cc">
                <a>{children}</a>
                <div className="bar"></div> 
            </div>
        </Link>
    )
}


const style = css`
    position: relative;
    height: 100%;
    font-family: Poppins;
    font-weight: 600;
    font-size: 18px;
    color: var(--army);
    text-align: center;
    padding: 0 12px;
    cursor: pointer;
    transition: 0.1s;

    &.login {
        padding-left: 12px;
        padding-right: 0;

        button{
            padding: 8px 24px;
        }
    }

    .bar {
        opacity: 0;
        height: 4px;
        position: absolute;
        bottom: 0;
        width: 0;
        background: var(--army);
        transition: all 0.25s, opacity 0.1s;
        
    }

    &:hover {
        .bar {
            width: 90%;
            opacity: 1;
        }
    }

    @media (max-width: 950px) {
        padding: 12px;

        .bar {
            display: none;
        }

        &:hover a {    
            transform: scale(1.02);
        }
    }
`        

export default LinkSet