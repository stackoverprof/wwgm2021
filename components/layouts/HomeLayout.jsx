import React from 'react'
import Navbar from '../molecular/Navbar'
import { css } from '@emotion/css'

const HomeLayout = ({className, children}) => {

    return (
        <div className={style}>
            <Navbar big/>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

const style = css`
    padding-top: 88px;
    
`

export default HomeLayout