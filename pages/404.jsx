import React from 'react'
import { css } from '@emotion/css'

const error404 = () => {

    return (
        <div className={style}>
            <h1>404 | Not Found</h1>
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
`

export default error404