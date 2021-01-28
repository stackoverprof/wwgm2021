import React from 'react'
import Navbar from '../molecular/Navbar'
import { css } from '@emotion/react'

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