import React from 'react'
import Navbar from '../molecular/Navbar'
import { css } from '@emotion/react'

const HomeLayout = ({style, children}) => {

    return (
        <div css={layer}>
            <Navbar big/>
            <div css={style}>
                {children}
            </div>
        </div>
    )
}

const layer = css`
    padding-top: 88px;
    
`

export default HomeLayout