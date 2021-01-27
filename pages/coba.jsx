import React from 'react'
import { css } from '@emotion/css'
import useResize from 'use-resizing'

const Coba = () => {

    const screen = useResize().width

    return (
        <div className={style({screen})}>
            <h1>haha</h1>
        </div>
    )
}

const style = ({screen}) => css`
    background: ${screen > 800 ? 'pink' : 'green'};
`

export default Coba