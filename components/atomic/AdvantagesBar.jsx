import React from 'react'
import { css } from '@emotion/react'
import useResize from 'use-resizing'

const AdvantagesBar = () => {
    const screen = useResize().width

    return (
        <div css={style}>
            <img src={`/img/assets/advantages-bar-${screen > 800 ? 'lg' : screen > 500 ? 'md' : 'sm'}.svg`} alt=""/>
        </div>
    )
}

const style = css`
    pointer-events: none;
    user-select: none;
`

export default AdvantagesBar