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

// [TODO] : ISSUE FOOTER MIN-HEIGHT NYA LAYAOUT
const layer = css`
    position: relative;
    padding-top: 60px;
`

export default MainLayout