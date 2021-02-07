import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'

const RunningText = ({className, children, offset = 0}) => {
    const [spanWidth, setSpanWidth] = useState(0)
    const [pWidth, setPWidth] = useState(0)
    const Span = useRef(null)
    const P = useRef(null)

    useEffect(() => setPWidth(P.current.offsetWidth), [P])

    useEffect(() => setSpanWidth(Span.current.offsetWidth), [Span])

    return (
        <p css={style({spanWidth, pWidth, offset})} ref={P} className={className}>
            <span ref={Span}>{children}</span>
        </p>
    )
}

const style = ({spanWidth, pWidth, offset}) => css`
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 100%;
    width: 100%;

    span{
        position: relative;
        top: 0;
        left: 0;
        white-space: nowrap;
    }
    
    &:hover span{
        transition: ${spanWidth/60}s ease-out;
        left: -${spanWidth - pWidth + offset }px;
        
    }
    
`

export default RunningText