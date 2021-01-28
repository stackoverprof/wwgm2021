import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import to from '../core/routepath'

const error404 = () => {

    return (
        <div css={style}>
            <h1>404 | Not Found</h1>
            <Link href={to.home}><button>BACK HOME</button></Link>
        </div>
    )
}

const style = css`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default error404