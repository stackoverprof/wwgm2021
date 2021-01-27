import React from 'react'
import Navbar from '../molecular/Navbar'
import { css } from '@emotion/css'

const MainLayout = ({className, children}) => {

    return (
        <div className={style}>
            <Navbar />
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

const style = css`
    padding-top: 60px;
    
`

export default MainLayout