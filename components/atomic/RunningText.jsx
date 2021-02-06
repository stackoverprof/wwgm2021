import React, { useRef } from 'react'
import { css } from '@emotion/react'

const RunningText = ({className, children}) => {
    const Span = useRef(null)
    const P = useRef()

    return (
        <p css={style({Span, P})} ref={P} className={className}>
            <span ref={Span}>{children}</span>
        </p>
    )
}

const style = ({Span, P}) => css`
    overflow: hidden;

    span{
        position: relative;
        top: 0;
        left: 0;
    }
    
    &:hover span{
        transition: ${Span.current ? Span.current.offsetWidth/60 : 0}s ease-out;
        left: -${Span.current ? Span.current.offsetWidth - P.current.offsetWidth : 0}px;
        
    }
    
`

export default RunningText