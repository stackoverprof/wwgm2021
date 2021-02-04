import React from 'react'
import { css } from '@emotion/react'

const MenuButton = ({open, setOpen, breakpoint}) => {

    return (
        <div css={style({open, breakpoint})} className="flex-be col" onClick={() => setOpen(!open)}>
            <div className="burger"></div>
            <div className="burger"></div>
            <div className="burger"></div>
        </div>
    )
}

const style =  ({open, breakpoint}) => css`
    height: 32px;
    width: 32px;
    transition: 0.25s;

    &:hover{
        width: 36px;
        margin-right: -2px;
    }

    @media (min-width: ${breakpoint}px){
        display: none;
    }

    .burger{
        width: 100%;
        height: 20%;
        background: #0F1A12;
        border-radius: 4px;
        transition: 0.25s;

        &:nth-of-type(2){
            width: ${open ? '76%' : '100%'};
        }
        &:nth-of-type(3){
            width: ${open ? '53%' : '100%'};
        }
    }
`

export default MenuButton