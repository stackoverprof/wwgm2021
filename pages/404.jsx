import React from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { to }from '@core/routepath'

const error404 = () => {

    return (
        <div css={style} className="flex-cc col">
            <h1>404 | Not Found</h1>
            <Link href={to.home}><button>BACK HOME</button></Link>
        </div>
    )
}

const style = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export default error404