import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import Navbar from '@components/molecular/Navbar'

const HomeLayout = ({style, children}) => {
    const [navHeight, setNavHeight] = useState(0)
    const navRef = useRef(null)

    useEffect(() => {
        setNavHeight(navRef.current.firstChild.offsetHeight)
    }, [])

    return (
        <div css={layer({navHeight})} ref={navRef}>
            <Navbar />
            <div css={style}>
                {children}
            </div>
        </div>
    )
}

const layer = ({navHeight}) => css`
    padding-top: ${navHeight}px;
    padding-bottom: 54px;
`

export default HomeLayout