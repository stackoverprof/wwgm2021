import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { to }from '@core/routepath'

import AuthArea from './AuthArea'

const defaultItems = [
    {
        route: to._404,
        label: 'Try Out'
    },
    {
        route: to._404,
        label: 'Dokumentasi'
    },
    {
        route: to._404,
        label: 'Tentang Kami'
    }
]

const LinkSet = ({
    items = defaultItems,
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
        {items.map((item, i) => (
            <LinkItem route={item.route} key={i}>{item.label}</LinkItem>
        ))}
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
            <a css={style} className="flex-cc">
                <p>{children}</p>
                <div className="bar"></div> 
            </a>
        </Link>
    )
}


const style = css`
    position: relative;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: 0.1s;

    p {
        font-family: Poppins;
        font-weight: 600;
        font-size: 18px;
        color: var(--army);
        text-align: center;
    }

    &.login {
        padding-left: 12px;
        padding-right: 0;

        button {
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

        &:hover p {    
            transform: scale(1.02);
        }
    }
`        

export default LinkSet