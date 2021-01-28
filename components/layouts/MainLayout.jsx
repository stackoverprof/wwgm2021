import React from 'react'
import { css } from '@emotion/react'
import Navbar from '../molecular/Navbar'

const MainLayout = ({style, children}) => {

    return (
        <div css={layer}>
            <Navbar />
            <div css={style}>
                {children}
            </div>
        </div>
    )
}

const layer = css`
    padding-top: 60px;
`

export default MainLayout